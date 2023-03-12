// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lib/openzeppelin-contracts/contracts/security/Pausable.sol";
import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/// @custom:security-contact cocodrilette@gmail.com
contract RegistrationManager is Initializable, Pausable, AccessControl, ReentrancyGuard {
    uint256 public registrationFee;

    /// @notice This is the most efficient way to know if a user is registered.
    mapping(address => bool) public isRegistered;
    mapping(address => bool) public isConfirmed;
    address[] public registeredUsers;

    event RegistrationFeeUpdated(address indexed admin, uint256 newFee, uint256 previosFee);
    event UserRegistered(address indexed newUser);

    modifier notContractSender() {
        if ((msg.sender).code.length != 0) revert("SenderIsContract");
        _;
    }

    modifier notZeroAddress(address _address) {
        if (_address == address(0)) revert("ZeroAddress");
        if (msg.sender == address(0)) revert("ZeroAddress");
        _;
    }

    constructor(uint256 _initialRegistrationFee) {
        registrationFee = _initialRegistrationFee;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * @param _newFee The value to rewrite the current `registrationFee`
     * @return A boolean value indicating whether the operation was successful.
     */
    function updateRegistrationFee(uint256 _newFee) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool) {
        uint256 prevFee = registrationFee;
        registrationFee = _newFee;

        emit RegistrationFeeUpdated(msg.sender, _newFee, prevFee);
        return true;
    }

    /**
     * @dev Allow a participant to join in by paying the registration fee.
     * @return A boolean value indicating whether the operation was successful.
     * @dev The participant must not have already registered and must pay the registration fee.
     */
    function joinIn() external payable whenNotPaused notContractSender returns (bool) {
        if (msg.value != registrationFee) revert("RegistrationFeeNotPayed");

        if (isRegistered[msg.sender]) revert("AlreadyRegistered");

        isRegistered[msg.sender] = true;
        registeredUsers.push(msg.sender);

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
        notZeroAddress(_account)
        returns (bool)
    {
        if (isConfirmed[_account] == true) revert("AlreadyConfirmed");
        if (isRegistered[_account] == false) revert("NotRegistered");

        isConfirmed[_account] = true;

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
        nonReentrant
        returns (bool)
    {
        if (isRegistered[_account] == false) {
            revert("NotRegistered");
        }

        if (isConfirmed[_account] == false) {
            revert("NotConfirmed");
        }

        (bool success,) = payable(_account).call{value: registrationFee}("");
        if (!success) revert("TransactionFailed");

        isRegistered[_account] = false;
        isConfirmed[_account] = false;

        return true;
    }

    function getRegisteredUsers() external view returns (address[] memory) {
        return registeredUsers;
    }

    function reset() external whenPaused onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            isRegistered[registeredUsers[i]] = false;
            isConfirmed[registeredUsers[i]] = false;
        }
        delete registeredUsers;
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
}
