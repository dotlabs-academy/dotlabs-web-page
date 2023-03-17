// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "../lib/openzeppelin-contracts/contracts/security/Pausable.sol";
import "../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
import "../lib/openzeppelin-contracts/contracts/security/ReentrancyGuard.sol";

/// @custom:security-contact cocodrilette@gmail.com
contract RegistrationManager is Initializable, Pausable, AccessControl, ReentrancyGuard {
    uint256 public registrationFee;

    event RegistrationFeeUpdated(address indexed admin, uint256 newFee, uint256 previosFee);

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
     * @notice Allow a participant to join in by paying the registration fee.
     * @return A boolean value indicating whether the operation was successful.
     * @dev The participant must not have already registered and must pay the registration fee.
     */
    function joinIn() external payable whenNotPaused notContractSender returns (bool) {
        return true;
    }

    function getRegisteredUsers() external view returns (address[] memory) {}

    function reset() external whenPaused onlyRole(DEFAULT_ADMIN_ROLE) {}

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
