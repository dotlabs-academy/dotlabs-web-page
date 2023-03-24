// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../lib/forge-std/src/Test.sol";
import "../src/RegistrationManager.sol";

contract Caller {
    function callJoinIn(address _contract, uint256 _registrationFee) public {
        RegistrationManager(_contract).joinIn{value: _registrationFee}();
    }
}

contract TestRegistrationManager is Test {
    string public localJsonRPC = "http://127.0.0.1:8545/";
    address public proxyContract = 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853;
    address public implContract = 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9;
    uint256 public localForkId;

    RegistrationManager public registrationManager = RegistrationManager(proxyContract);

    address deployerAddress = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

    function setUp() public {
        localForkId = vm.createFork(localJsonRPC);
    }

    function testRegistrationManagerDeployedCorrectly() public {
        vm.selectFork(localForkId);

        bytes32 pauserRole = registrationManager.PAUSER_ROLE();
        assertEq(pauserRole, keccak256("PAUSER_ROLE"));

        bytes32 defaultAdminRole = registrationManager.DEFAULT_ADMIN_ROLE();
        assertEq(defaultAdminRole, 0x00);

        uint256 registrationFee = registrationManager.registrationFee();
        assertEq(registrationFee, 0);

        address user_1 = address(1);
        bool isJoined = registrationManager.isJoined(user_1);
        assertEq(isJoined, false);

        bool isConfirmed = registrationManager.isConfirmed(user_1);
        assertEq(isConfirmed, false);

        address[] memory users = registrationManager.getJoinedUsers();
        assertEq(users.length, 0);
    }

    function testRegistrationManagerUpdateRegistrationFee() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;

        uint256 previousFee = registrationManager.registrationFee();
        assertEq(previousFee, 0);

        vm.prank(deployerAddress);
        bool success = registrationManager.updateRegistrationFee(newFee);
        assertEq(success, true);

        uint256 updatedFee = registrationManager.registrationFee();
        assertEq(updatedFee, newFee);
    }

    function testFailRegistrationManagerUpdateRegistrationFeeWhenNotAdminRole() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;
        uint256 previousFee = registrationManager.registrationFee();
        assertEq(previousFee, 0);

        address user_1 = address(1);

        // vm.expectRevert(
        //     "AccessControl: account 0x7fa9385be102ac3eac297483dd6233d62b3e1496 is missing role 0x00000000000000000000000000000000000000000000000000000000000000"
        // );
        vm.prank(user_1);
        registrationManager.updateRegistrationFee(newFee);
    }

    function testJoinIn() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;
        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        address user_1 = address(1);

        vm.deal(user_1, newFee + 0.1 ether);

        vm.prank(user_1);
        bool success = registrationManager.joinIn{value: newFee}();
        assertEq(success, true);

        bool isJoined = registrationManager.isJoined(user_1);
        assertEq(isJoined, true);
    }

    function testFailJoinInWhenContractCaller() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;
        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        Caller caller = new Caller();
        vm.deal(address(caller), newFee + 0.1 ether);
        vm.prank(address(caller));
        vm.expectRevert("RegistrationManager: contract caller");
        caller.callJoinIn(address(registrationManager), newFee);
    }

    function testFailJoinInWhenNotEnoughFee() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;

        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        address user_1 = address(1);

        vm.deal(user_1, newFee - 0.1 ether);
        vm.prank(user_1);

        vm.expectRevert("RegistrationManager: invalid fee");
        registrationManager.joinIn{value: newFee - 0.1 ether}();
    }

    function testFailJoinInWhenAlreadyJoined() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;
        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        address user_1 = address(1);

        vm.deal(user_1, newFee + 0.1 ether);

        vm.prank(user_1);
        bool success = registrationManager.joinIn{value: newFee}();
        assertEq(success, true);

        bool isJoined = registrationManager.isJoined(user_1);
        assertEq(isJoined, true);

        vm.expectRevert("RegistrationManager: already joined");
        registrationManager.joinIn{value: newFee}();
    }

    function testFailJoinInWhenAlreadyConfirmed() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;

        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        address user_1 = address(1);

        vm.deal(user_1, newFee + 0.1 ether);
        vm.prank(user_1);

        bool success = registrationManager.joinIn{value: newFee}();
        assertEq(success, true);

        bool isJoined = registrationManager.isJoined(user_1);
        assertEq(isJoined, true);

        vm.prank(deployerAddress);
        registrationManager.confirmUserQuota(user_1);

        vm.expectRevert("RegistrationManager: already confirmed");
        registrationManager.joinIn{value: newFee}();
    }

    function testConfirmUserQuota() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;

        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        address user_1 = address(1);
        vm.deal(user_1, newFee + 0.1 ether);
        vm.prank(user_1);

        bool joinInSuccess = registrationManager.joinIn{value: newFee}();
        assertEq(joinInSuccess, true);

        bool isJoined = registrationManager.isJoined(user_1);
        assertEq(isJoined, true);

        bool confirmationSuccess = registrationManager.confirmUserQuota(user_1);
        assertEq(confirmationSuccess, true);

        bool isConfirmed = registrationManager.isConfirmed(user_1);
        assertEq(isConfirmed, true);
    }

    function testFailConfirmUserQuotaWhenZeroAddress() public {
        vm.selectFork(localForkId);

        vm.expectRevert("RegistrationManager: zero address");
        registrationManager.confirmUserQuota(address(0));
    }

    function testFailConfirmUserQuotaWhenAlreadyConfirmed() public {
        vm.selectFork(localForkId);

        uint256 newFee = 0.4 ether;

        vm.prank(deployerAddress);
        registrationManager.updateRegistrationFee(newFee);

        address user_1 = address(1);
        vm.deal(user_1, newFee + 0.1 ether);

        vm.prank(user_1);
        bool joinInSuccess = registrationManager.joinIn{value: newFee}();
        assertEq(joinInSuccess, true);

        bool isJoined = registrationManager.isJoined(user_1);
        assertEq(isJoined, true);

        bool confirmationSuccess = registrationManager.confirmUserQuota(user_1);
        assertEq(confirmationSuccess, true);

        bool isConfirmed = registrationManager.isConfirmed(user_1);
        assertEq(isConfirmed, true);

        vm.expectRevert("RegistrationManager: already confirmed");
        registrationManager.confirmUserQuota(user_1);
    }

    function testFailConfirmUserQuotaWhenNotJoined() public {
        vm.selectFork(localForkId);

        address user_1 = address(1);

        vm.expectRevert("RegistrationManager: not joined");
        registrationManager.confirmUserQuota(user_1);
    }
}
