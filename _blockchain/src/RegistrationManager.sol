// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../lib/openzeppelin-contracts/contracts/security/Pausable.sol";
import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/// @custom:security-contact cocodrilette@gmail.com
contract RegistrationManager is Initializable, Pausable, AccessControl, ReentrancyGuard {
    uint256 public registrationFee;

    /// @notice When an user is `joined` it's mean that the registration fee was payed and locked
    mapping(address => bool) isJoined;
    /// @notice This is the admin confirmation about the user quota
    mapping(address => bool) isConfirmed;
    /// @dev This allow to reset the mappings above by iteration
    address[] users;

    event RegistrationFeeUpdated(address indexed admin, uint256 newFee, uint256 previosFee);

    modifier notContractSender() {
        if ((msg.sender).code.length != 0) revert("SenderIsContract");
        _;
    }

    modifier notZeroAddress(address _address) {
        if (_address == address(0)) revert("ZeroAddressFound");
        if (msg.sender == address(0)) revert("ZeroAddressFound");
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
     * @notice Allow a participant to join in by paying the registration fee.
     * @return A boolean value indicating whether the operation was successful.
     * @dev The participant must not have already registered and must pay the registration fee.
     */
    function joinIn() external payable whenNotPaused notContractSender returns (bool) {
        address sender = _getSenderSafe();
        if (isConfirmed[sender]) revert("You are already confirmed");
        if (isJoined[sender]) revert("You are alredy joined");
        if (msg.value != registrationFee) revert("You sent invalid value.");

        isJoined[sender] = true;
        users.push(sender);

        return true;
    }

    /**
     * @param _userAddress The user address you want to confirm
     * @notice Allow an admint o confirm a user quota.
     * @return A boolean value indicating whether the operation was successful.
     */
    function confirmUserQuota(address _userAddress) external notZeroAddress(_userAddress) returns (bool) {
        if (isConfirmed[_userAddress]) revert("AlreadyConfirmed");
        if (!isJoined[_userAddress]) revert("NotJoined");

        isJoined[_userAddress] = false;
        isConfirmed[_userAddress] = true;

        return true;
    }

    /**
     * @param _usersAddresses The users addresses you want to confirm
     * @notice Allow an admint o confirm a users quota.
     * @return A boolean value indicating whether the operation was successful.
     */
    function confirmUserQuotaBatch(address[] memory _usersAddresses) external returns (bool) {
        for (uint256 i = 0; i < _usersAddresses.length; i++) {
            if (_usersAddresses[0] == address(0)) revert("ZeroAddressFound");
            if (isConfirmed[_usersAddresses[i]]) revert("AlreadyConfirmed");
            if (!isJoined[_usersAddresses[i]]) revert("NotJoined");

            isJoined[_usersAddresses[i]] = false;
            isConfirmed[_usersAddresses[i]] = true;
        }
        return true;
    }

    /// @notice Set the user related state variables to their default value.
    /// @dev Only users with `DEFAULT_ADMIN_ROLE` can executed it.
    function reset() external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            isJoined[user] = false;
            isConfirmed[user] = false;
        }
        delete users;
    }

    function refundFee(address _userAddress)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        notZeroAddress(_userAddress)
        nonReentrant
        returns (bool success)
    {
        (success,) = payable(_userAddress).call{value: registrationFee}("");
    }

    function refundFeeBatch(address[] memory _usersAddresses)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        nonReentrant
        returns (bool)
    {
        for (uint256 i = 0; i < _usersAddresses.length; i++) {
            (bool success,) = payable(_usersAddresses[i]).call{value: registrationFee}("");
            if (!success) revert("TransactionFailed");
        }
        return true;
    }

    function getJoinedUsers() external view returns (address[] memory) {
        return users;
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
