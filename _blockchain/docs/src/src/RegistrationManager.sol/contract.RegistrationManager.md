# RegistrationManager
[Git Source](https://github.com/dotlabs-academy/dotlabs-web-page/blob/575cc2955a4292a45add1a1dce7bc25aedaab703/src/RegistrationManager.sol)

**Inherits:**
Initializable, Pausable, AccessControl, ReentrancyGuard


## State Variables
### registrationFee

```solidity
uint256 public registrationFee;
```


### isJoined
When an user is `joined` it's mean that the registration fee was payed and locked


```solidity
mapping(address => bool) isJoined;
```


### isConfirmed
This is the admin confirmation about the user quota


```solidity
mapping(address => bool) isConfirmed;
```


### users
*This allow to reset the mappings above by iteration*


```solidity
address[] users;
```


## Functions
### notContractSender


```solidity
modifier notContractSender();
```

### notZeroAddress


```solidity
modifier notZeroAddress(address _address);
```

### constructor


```solidity
constructor(uint256 _initialRegistrationFee);
```

### updateRegistrationFee


```solidity
function updateRegistrationFee(uint256 _newFee) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newFee`|`uint256`|The value to rewrite the current `registrationFee`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### joinIn

Allow a participant to join in by paying the registration fee.

*The participant must not have already registered and must pay the registration fee.*


```solidity
function joinIn() external payable whenNotPaused notContractSender returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### confirmUserQuota

Allow an admint o confirm a user quota.


```solidity
function confirmUserQuota(address _userAddress) external notZeroAddress(_userAddress) returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_userAddress`|`address`|The user address you want to confirm|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### confirmUserQuotaBatch

Allow an admint o confirm a users quota.


```solidity
function confirmUserQuotaBatch(address[] memory _usersAddresses) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_usersAddresses`|`address[]`|The users addresses you want to confirm|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### reset

Set the user related state variables to their default value.

*Only users with `DEFAULT_ADMIN_ROLE` can executed it.*


```solidity
function reset() external onlyRole(DEFAULT_ADMIN_ROLE);
```

### refundFee


```solidity
function refundFee(address _userAddress)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    notZeroAddress(_userAddress)
    nonReentrant
    returns (bool success);
```

### refundFeeBatch


```solidity
function refundFeeBatch(address[] memory _usersAddresses)
    external
    onlyRole(DEFAULT_ADMIN_ROLE)
    nonReentrant
    returns (bool);
```

### getJoinedUsers


```solidity
function getJoinedUsers() external view returns (address[] memory);
```

### pause

Pauses the contract, preventing any further registration.

*Only the account with the DEFAULT_ADMIN_ROLE can pause the contract.*


```solidity
function pause() public onlyRole(DEFAULT_ADMIN_ROLE);
```

### unpause

Unpauses the contract, allowing registration actions to proceed.

*Only the account with the DEFAULT_ADMIN_ROLE can unpause the contract.*


```solidity
function unpause() public onlyRole(DEFAULT_ADMIN_ROLE);
```

### _getSenderSafe

Returns the safe address of the contract's caller.

*If the caller is a contract, the ContractSender error is thrown.*


```solidity
function _getSenderSafe() private view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|sender The safe address of the contract's caller.|


## Events
### RegistrationFeeUpdated

```solidity
event RegistrationFeeUpdated(address indexed admin, uint256 newFee, uint256 previosFee);
```

