# RegisterManagerV1
**Inherits:**
Initializable, Pausable, AccessControl


## State Variables
### ADMIN_ROLE

```solidity
bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
```


### registrationFee

```solidity
uint256 public registrationFee = 0.5 ether;
```


### isRegistered

```solidity
mapping(address => bool) private isRegistered;
```


### participantIndexByAddress

```solidity
mapping(address => uint256) private participantIndexByAddress;
```


### participants

```solidity
Participant[] public participants;
```


### ASoto

```solidity
address public constant ASoto = 0x820FAec66A504901De79fa44D21609d457174f5B;
```


### CRodriguez

```solidity
address public constant CRodriguez = 0x7D6f2288d6726A2B587B50933cAEC406e3A1F109;
```


## Functions
### constructor


```solidity
constructor();
```

### joinIn

*Allow a participant to join in by paying the registration fee.*

*The participant must not have already registered and must pay the registration fee.*


```solidity
function joinIn(string calldata _name) external payable whenNotPaused returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The name of the participant.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the operation was successful.|


### confirmParticipant

Confirms a participant's registration by setting their `confirmed` flag to true.

*Only the account with the ADMIN_ROLE can confirm a participant, and the contract must be paused.*

*If the participant is already confirmed, an AlreadyConfirmed error is thrown.*


```solidity
function confirmParticipant(address _account) external onlyRole(ADMIN_ROLE) whenPaused returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address of the participant to be confirmed.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|success A boolean indicating whether the confirmation was successful or not.|


### refundFee

Refunds the registration fee to a participant.

*Only the account with the ADMIN_ROLE can refund a participant's fee, and the contract must be paused.*

*If the participant's fee is less than the registration fee, a NoFundsLooked error is thrown.*

*If the refund transaction fails, a TransactionFailed error is thrown.*


```solidity
function refundFee(address _account) external onlyRole(ADMIN_ROLE) whenPaused returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address of the participant to refund the fee to.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|success A boolean indicating whether the refund was successful or not.|


### getConfirmedParticipants

Retrieves an array of confirmed participants.

*This function can be called by anyone at any time.*


```solidity
function getConfirmedParticipants() external view returns (Participant[] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Participant[]`|An array of participants who have been confirmed.|


### getUnconfirmedParticipants

Retrieves an array of unconfirmed participants.

*This function can be called by anyone at any time.*


```solidity
function getUnconfirmedParticipants() external view returns (Participant[] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Participant[]`|An array of participants who have not been confirmed.|


### resetParticipants

Resets the participants array, removing all participants from the tournament.

*Only the account with the ADMIN_ROLE can reset the participants array.*


```solidity
function resetParticipants() external onlyRole(ADMIN_ROLE);
```

### getParticipant


```solidity
function getParticipant(address _account) external view returns (Participant memory);
```

### pause

Pauses the contract, preventing any further registration, confirmation, or unregistration actions.

*Only the account with the ADMIN_ROLE can pause the contract.*


```solidity
function pause() public onlyRole(ADMIN_ROLE);
```

### unpause

Unpauses the contract, allowing registration, confirmation, and unregistration actions to proceed.

*Only the account with the ADMIN_ROLE can unpause the contract.*


```solidity
function unpause() public onlyRole(ADMIN_ROLE);
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


### _getParticipant

Returns the storage reference to the Participant with the given account address.

*If no Participant exists with the given account address, the AccountNotFound error is thrown.*


```solidity
function _getParticipant(address _account) private view returns (Participant storage participant);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The account address of the participant to retrieve.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`participant`|`Participant`|The storage reference to the Participant with the given account address.|


