// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "../lib/openzeppelin-contracts/contracts/security/Pausable.sol";
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/// @custom:security-contact cocodrilette@gmail.com
contract RegistrationManager is Pausable, AccessControl, ReentrancyGuard {
    /// @notice The registration fee to join in the event
    uint256 public registrationFee;

    /// @notice When an user is `joined` it's mean that the registration fee was payed and locked
    mapping(address => bool) public isJoined;
    /// @notice This is the admin confirmation about the user quota
    mapping(address => bool) public isConfirmed;
    /// @notice This keeps track of the last fee paid by the user
    mapping(address => uint256) public lastFeePaid;
    /// @dev This allow to reset the mappings above by iteration
    address[] public joinedUsers;

    /**
     * @param admin The address of the admin who updated the registration fee
     * @param newFee The new registration fee
     * @param previousFee The previous registration fee
     * @notice This event is emitted when the registration fee is updated
     */
    event RegistrationFeeUpdated(address indexed admin, uint256 newFee, uint256 previousFee);
    /**
     * @param user The address of the user who joined in
     * @param fee The registration fee paid by the user
     */
    event JoinedIn(address indexed user, uint256 fee);

    /// @notice This modifier prevent a contract to call the function
    modifier notContractSender() {
        if ((msg.sender).code.length != 0) revert("RegistrationManager: contract caller");
        _;
    }

    /// @notice This modifier prevent a zero address to be used
    modifier notZeroAddress(address _address) {
        if (_address == address(0)) revert("RegistrationManager: zero address");
        if (msg.sender == address(0)) revert("RegistrationManager: zero address");
        _;
    }

    constructor(uint256 _initialFee) {
        registrationFee = _initialFee;

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
        address sender = msg.sender;
        if (msg.value != registrationFee) revert("RegistrationManager: invalid fee");
        if (isConfirmed[sender]) revert("RegistrationManager: already confirmed");
        if (isJoined[sender]) revert("RegistrationManager: already joined");

        isJoined[sender] = true;
        lastFeePaid[sender] = msg.value;
        joinedUsers.push(sender);

        return true;
    }

    /**
     * @param _userAddress The user address you want to confirm
     * @notice Allow an admint o confirm a user quota.
     * @return A boolean value indicating whether the operation was successful.
     */
    function confirmUserQuota(address _userAddress)
        public
        notZeroAddress(_userAddress)
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (bool)
    {
        if (isConfirmed[_userAddress]) revert("RegistrationManager: already confirmed");
        if (!isJoined[_userAddress]) revert("RegistrationManager: not joined");

        isConfirmed[_userAddress] = true;

        return true;
    }

    /**
     * @param _usersAddresses The users addresses you want to confirm
     * @notice Allow an admint o confirm a users quota.
     * @return A boolean value indicating whether the operation was successful.
     */
    function confirmUserQuotaBatch(address[] memory _usersAddresses)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (bool)
    {
        for (uint256 i = 0; i < _usersAddresses.length; i++) {
            confirmUserQuota(_usersAddresses[i]);
        }
        return true;
    }

    /// @notice Set the user related state variables to their default value.
    /// @dev Only users with `DEFAULT_ADMIN_ROLE` can executed it.
    function reset() external onlyRole(DEFAULT_ADMIN_ROLE) {
        for (uint256 i = 0; i < joinedUsers.length; i++) {
            address user = joinedUsers[i];
            isJoined[user] = false;
            isConfirmed[user] = false;
            lastFeePaid[user] = 0;
        }
        delete joinedUsers;
    }

    /**
     * @param _userAddress The user address you want to refund
     * @notice Allow an admin to refund the registration fee.
     * @return A boolean value indicating whether the operation was successful.
     */
    function refundFee(address _userAddress)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
        notZeroAddress(_userAddress)
        nonReentrant
        returns (bool)
    {
        if (isJoined[_userAddress] || isConfirmed[_userAddress]) {
            uint256 _lastFeePaid = lastFeePaid[_userAddress];

            lastFeePaid[_userAddress] = 0;

            (bool success,) = payable(_userAddress).call{value: _lastFeePaid}("");
            if (!success) revert("TransactionFailed");

            return success;
        }

        revert("UserNotFound");
    }

    /**
     * @param _usersAddresses The users addresses you want to refund
     * @notice Allow an admin to refund the registration fee.
     * @return A boolean value indicating whether the operation was successful.
     */
    function refundFeeBatch(address[] memory _usersAddresses) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool) {
        for (uint256 i = 0; i < _usersAddresses.length; i++) {
            refundFee(_usersAddresses[i]);
        }

        return true;
    }

    /**
     * @notice Returns the list of users who joined in the event.
     * @return An array of addresses.
     */
    function getJoinedUsers() external view returns (address[] memory) {
        return joinedUsers;
    }

    /**
     * @notice Pauses the contract, preventing any further registration.
     * @dev Only the account with the PAUSER_ROLE can pause the contract.
     */
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @notice Unpauses the contract, allowing registration actions to proceed.
     * @dev Only the account with the PAUSER_ROLE can unpause the contract.
     */
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
