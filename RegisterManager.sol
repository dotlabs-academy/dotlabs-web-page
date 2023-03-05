// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

/// @title Participant
/// @notice Represents a participant in the event.
struct Participant {
    /// @notice The name of the participant.
    string name;
    /// @notice The Ethereum wallet address of the participant.
    address walletAddress;
    /// @notice Indicates whether the participant has been confirmed by an DEFAULT_ADMIN_ROLE.
    bool confirmed;
    /// @notice The fee the participant has agreed to pay to participate in the event, in wei. This amount will be refunded if the participant attends.
    uint256 feeLooked;
}

/// @custom:security-contact cocodrilette@gmail.com
contract RegisterManagerV1 is
    Initializable,
    PausableUpgradeable,
    AccessControlUpgradeable
{
    uint256 public registrationFee;

    mapping(address => bool) private isRegistered;
    mapping(address => uint256) private participantIndexByAddress;
    Participant[] public participants;

    address public ASoto;
    address public CRodriguez;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Pausable_init();
        __AccessControl_init();

        registrationFee = 0.5 ether;

        ASoto = 0x820FAec66A504901De79fa44D21609d457174f5B;
        CRodriguez = 0x7D6f2288d6726A2B587B50933cAEC406e3A1F109;

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(DEFAULT_ADMIN_ROLE, ASoto);
        grantRole(DEFAULT_ADMIN_ROLE, CRodriguez);
    }

    /**
     * @dev Allow a participant to join in by paying the registration fee.
     * @param _name The name of the participant.
     * @return A boolean value indicating whether the operation was successful.
     * @dev The participant must not have already registered and must pay the registration fee.
     */
    function joinIn(string calldata _name)
        external
        payable
        whenNotPaused
        returns (bool)
    {
        address sender = _getSenderSafe();
        if (isRegistered[sender]) revert("AlreadyRegistered");
        if (msg.value != registrationFee) revert("UnpayedFee");

        participantIndexByAddress[sender] = participants.length;
        participants.push(
            Participant({
                name: _name,
                walletAddress: sender,
                confirmed: false,
                feeLooked: msg.value
            })
        );
        isRegistered[sender] = true;

        return true;
    }

    /**
     * @notice Confirms a participant's registration by setting their `confirmed` flag to true.
     * @param _account The address of the participant to be confirmed.
     * @return success A boolean indicating whether the confirmation was successful or not.
     * @dev Only the account with the DEFAULT_ADMIN_ROLE can confirm a participant, and the contract must be paused.
     * @dev If the participant is already confirmed, an AlreadyConfirmed error is thrown.
     */
    function confirmParticipant(address _account)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        whenPaused
        returns (bool)
    {
        Participant storage participant = _getParticipant(_account);
        if (participant.confirmed) revert("AlreadyConfirmed");
        participant.confirmed = true;

        return true;
    }

    /**
     * @notice Refunds the registration fee to a participant.
     * @param _account The address of the participant to refund the fee to.
     * @return success A boolean indicating whether the refund was successful or not.
     * @dev Only the account with the DEFAULT_ADMIN_ROLE can refund a participant's fee, and the contract must be paused.
     * @dev If the participant's fee is less than the registration fee, a NoFundsLooked error is thrown.
     * @dev If the refund transaction fails, a TransactionFailed error is thrown.
     */
    function refundFee(address _account)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        whenPaused
        returns (bool)
    {
        Participant storage participant = _getParticipant(_account);
        if (participant.feeLooked < registrationFee) revert("NoFundsLooked");
        (bool success, ) = payable(_account).call{value: registrationFee}("");
        if (!success) revert("TransactionFailed");

        return success;
    }

    /**
     * @notice Retrieves an array of confirmed participants.
     * @return An array of participants who have been confirmed.
     * @dev This function can be called by anyone at any time.
     */
    function getConfirmedParticipants()
        external
        view
        returns (Participant[] memory)
    {
        Participant[] memory confirmedParticipants = new Participant[](
            participants.length
        );
        uint256 confirmedParticipantsCount = 0;
        for (uint256 i = 0; i < participants.length; i++) {
            if (participants[i].confirmed) {
                confirmedParticipants[
                    confirmedParticipantsCount
                ] = participants[i];
                confirmedParticipantsCount++;
            }
        }

        return confirmedParticipants;
    }

    /**
     * @notice Retrieves an array of unconfirmed participants.
     * @return An array of participants who have not been confirmed.
     * @dev This function can be called by anyone at any time.
     */
    function getUnconfirmedParticipants()
        external
        view
        returns (Participant[] memory)
    {
        Participant[] memory unconfirmedParticipants = new Participant[](
            participants.length
        );
        uint256 unconfirmedParticipantsCount = 0;
        for (uint256 i = 0; i < participants.length; i++) {
            if (!participants[i].confirmed) {
                unconfirmedParticipants[
                    unconfirmedParticipantsCount
                ] = participants[i];
                unconfirmedParticipantsCount++;
            }
        }

        return unconfirmedParticipants;
    }

    /**
     * @notice Resets the participants array, removing all participants from the tournament.
     * @dev Only the account with the DEFAULT_ADMIN_ROLE can reset the participants array.
     */
    function resetParticipants() external onlyRole(DEFAULT_ADMIN_ROLE) {
        delete participants;
    }

    function getParticipant(address _account)
        external
        view
        returns (Participant memory)
    {
        return _getParticipant(_account);
    }

    /**
     * @notice Pauses the contract, preventing any further registration, confirmation, or unregistration actions.
     * @dev Only the account with the DEFAULT_ADMIN_ROLE can pause the contract.
     */
    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpauses the contract, allowing registration, confirmation, and unregistration actions to proceed.
     * @dev Only the account with the DEFAULT_ADMIN_ROLE can unpause the contract.
     */
    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @notice Returns the safe address of the contract's caller.
     * @return sender The safe address of the contract's caller.
     * @dev If the caller is a contract, the ContractSender error is thrown.
     */
    function _getSenderSafe() private view returns (address) {
        address sender = msg.sender;
        if (sender.code.length != 0) revert("ContractSender");
        return sender;
    }

    /**
     * @notice Returns the storage reference to the Participant with the given account address.
     * @param _account The account address of the participant to retrieve.
     * @return participant The storage reference to the Participant with the given account address.
     * @dev If no Participant exists with the given account address, the AccountNotFound error is thrown.
     */
    function _getParticipant(address _account)
        private
        view
        returns (Participant storage participant)
    {
        uint256 index = participantIndexByAddress[_account];
        if (index == 0 && participants[0].walletAddress != _account)
            revert("AccountNotFound");
        participant = participants[index];
    }
}
