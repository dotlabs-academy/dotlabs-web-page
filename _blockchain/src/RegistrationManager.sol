// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lib/openzeppelin-contracts/contracts/security/Pausable.sol";
import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

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
contract RegistrationManager is Initializable, Pausable, AccessControl, ReentrancyGuard {
    uint256 public registrationFee = 0.5 ether;

    mapping(address => bool) private isRegistered;
    mapping(address => uint256) private participantIndexByAddress;
    Participant[] public participants;

    modifier notEmptyString(string memory _string) {
        require(bytes(_string).length != 0, "String is empty");
        _;
    }

    modifier notZeroAddress(address _address) {
        require(_address != address(0), "Address is zero");
        _;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @dev Allow a participant to join in by paying the registration fee.
     * @param _name The name of the participant.
     * @return A boolean value indicating whether the operation was successful.
     * @dev The participant must not have already registered and must pay the registration fee.
     */
    function joinIn(string calldata _name) external payable whenNotPaused notEmptyString(_name) returns (bool) {
        address sender = _getSenderSafe();
        if (isRegistered[sender]) revert("AlreadyRegistered");
        if (msg.value != registrationFee) revert("UnpayedFee");

        participantIndexByAddress[sender] = participants.length;
        participants.push(Participant({name: _name, walletAddress: sender, confirmed: false, feeLooked: msg.value}));
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
        notZeroAddress(_account)
        returns (bool)
    {
        Participant storage participant = _getParticipant(_account);
        if (participant.confirmed) revert("AlreadyConfirmed");
        participant.confirmed = true;
        isRegistered[_account] = false;

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
        notZeroAddress(_account)
        nonReentrant
        returns (bool)
    {
        Participant storage participant = _getParticipant(_account);
        if (participant.feeLooked < registrationFee) revert("NoFundsLooked");
        (bool success,) = payable(_account).call{value: registrationFee}("");
        if (!success) revert("TransactionFailed");

        participant.feeLooked -= registrationFee;

        return success;
    }

    /**
     * @notice Resets the participants array, removing all participants from the tournament.
     * @dev Only the account with the DEFAULT_ADMIN_ROLE can reset the participants array.
     */
    function resetParticipants() external whenPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        delete participants;
    }

    function getParticipants() external view returns (Participant[] memory) {
        return participants;
    }

    function getParticipant(address _account) external view returns (Participant memory) {
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
        notZeroAddress(_account)
        returns (Participant storage participant)
    {
        uint256 index = participantIndexByAddress[_account];
        if (index == 0 && participants[0].walletAddress != _account) {
            revert("Account Not Found");
        }
        participant = participants[index];
    }
}
