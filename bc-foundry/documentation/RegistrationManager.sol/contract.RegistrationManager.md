# RegistrationManager
[Git Source](https://github.com/dotlabs-academy/dotlabs-web-page/blob/ef48b7cbd2c6051b29ebcb23e8fb212a8dd5265b/src/RegistrationManager.sol)

**Inherits:**
Pausable, AccessControl, ReentrancyGuard


## State Variables
### registrationFee
The registration fee to join in the event


```solidity
uint256 public registrationFee;
```


### isJoined
When an user is `joined` it's mean that the registration fee was payed and locked


```solidity
mapping(address => bool) public isJoined;
```


### isConfirmed
This is the admin confirmation about the user quota


```solidity
mapping(address => bool) public isConfirmed;
```


### lastFeePaid
This keeps track of the last fee paid by the user


```solidity
mapping(address => uint256) public lastFeePaid;
```


### joinedUsers
*This allow to reset the mappings above by iteration*


```solidity
address[] public joinedUsers;
```


## Functions
### notContractSender

This modifier prevent a contract to call the function


```solidity
modifier notContractSender();
```

### notZeroAddress

This modifier prevent a zero address to be used


```solidity
modifier notZeroAddress(address _address);
```

### constructor


```solidity
constructor(uint256 _initialFee);
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
function confirmUserQuota(address _userAddress)
    public
    notZeroAddress(_userAddress)
    onlyRole(DEFAULT_ADMIN_ROLE)
    returns (bool);
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
function confirmUserQuotaBatch(address[] memory _usersAddresses) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool);
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

Allow an admin to refund the registration fee.


```solidity
function refundFee(address _userAddress)
    public
    onlyRole(DEFAULT_ADMIN_ROLE)
    notZeroAddress(_userAddress)
    nonReentrant
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_userAddress`|`address`|The user address you want to refund|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### refundFeeBatch

Allow an admin to refund the registration fee.


```solidity
function refundFeeBatch(address[] memory _usersAddresses) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_usersAddresses`|`address[]`|The users addresses you want to refund|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### getJoinedUsers

Returns the list of users who joined in the event.


```solidity
function getJoinedUsers() external view returns (address[] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|An array of addresses.|


### pause

Pauses the contract, preventing any further registration.

*Only the account with the PAUSER_ROLE can pause the contract.*


```solidity
function pause() external onlyRole(DEFAULT_ADMIN_ROLE);
```

### unpause

Unpauses the contract, allowing registration actions to proceed.

*Only the account with the PAUSER_ROLE can unpause the contract.*


```solidity
function unpause() external onlyRole(DEFAULT_ADMIN_ROLE);
```

## Events
### RegistrationFeeUpdated
This event is emitted when the registration fee is updated


```solidity
event RegistrationFeeUpdated(address indexed admin, uint256 newFee, uint256 previousFee);
```

### JoinedIn

```solidity
event JoinedIn(address indexed user, uint256 fee);
```

