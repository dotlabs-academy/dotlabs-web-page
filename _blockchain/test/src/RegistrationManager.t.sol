// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../../lib/forge-std/src/Test.sol";
import "../../src/RegistrationManager.sol";

contract RegistrationManagerTest is Test {
    RegistrationManager registrationManager;
    uint256 registrationFee;

    function setUp() public {
        registrationManager = new RegistrationManager();
        registrationFee = registrationManager.registrationFee();
    }

    function testJoinIn() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        Participant memory participant = registrationManager.getParticipant(sender);

        assertEq(participant.name, name);
    }

    function testJoinInFailWithIncorrectValue() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.expectRevert("UnpayedFee");
        vm.prank(sender);
        registrationManager.joinIn{value: 0.4 ether}(name);
    }

    function testJoinInFailWhenPaused() public {
        registrationManager.pause();

        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.expectRevert("Pausable: paused");
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);
    }

    function testJoinInFailWhenEmptyString() public {
        string memory emptyString = "";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.expectRevert("String is empty");
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(emptyString);
    }

    function testConfirmParticipant() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        registrationManager.pause();
        registrationManager.confirmParticipant(sender);
        vm.stopPrank();

        Participant memory participant = registrationManager.getParticipant(sender);

        assertEq(participant.confirmed, true);
    }

    function testConfirmParticipantFailWhenNotPaused() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        vm.expectRevert("Pausable: not paused");
        registrationManager.confirmParticipant(sender);
        vm.stopPrank();
    }

    function testConfirmParticipantFailWhenNotAdmin() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.startPrank(sender);
        registrationManager.pause();
        vm.stopPrank();
    }

    function testConfirmParticipantFailWhenNotJoined() public {
        string memory name = "test";
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, 1 ether);
        vm.prank(sender1);
        registrationManager.joinIn{value: registrationFee}(name);

        registrationManager.pause();
        vm.expectRevert("Account Not Found");
        registrationManager.confirmParticipant(sender2);
        vm.stopPrank();
    }

    function testConfirmParticipantFailWhenZeroAddress() public {
        string memory name = "test";
        address sender = address(1);
        address zero = address(0);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        registrationManager.pause();
        vm.expectRevert("Address is zero");
        registrationManager.confirmParticipant(zero);
        vm.stopPrank();
    }

    function testRefundFee() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        registrationManager.pause();
        registrationManager.refundFee(sender);
        vm.stopPrank();

        Participant memory participant = registrationManager.getParticipant(sender);

        assertEq(participant.feeLooked, 0 ether);
    }

    function testRefundFeeFailWhenNotPaused() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        vm.expectRevert("Pausable: not paused");
        registrationManager.refundFee(sender);
        vm.stopPrank();
    }

    function testRefundFeeFailWhenNotAdmin() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.startPrank(sender);
        registrationManager.pause();
        vm.stopPrank();
    }

    function testRefunFeeFailWhenZeroAddress() public {
        string memory name = "test";
        address sender = address(1);
        address zero = address(0);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        registrationManager.pause();
        vm.expectRevert("Address is zero");
        registrationManager.refundFee(zero);
        vm.stopPrank();
    }

    function testResetParticipants() public {
        string memory name1 = "test1";
        string memory name2 = "test2";
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, 1 ether);
        vm.prank(sender1);
        registrationManager.joinIn{value: registrationFee}(name1);

        vm.deal(sender2, 1 ether);
        vm.prank(sender2);
        registrationManager.joinIn{value: registrationFee}(name2);

        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);
        registrationManager.resetParticipants();
        vm.stopPrank();

        Participant[] memory participants = registrationManager.getParticipants();

        assertEq(participants.length, 0);
    }

    function testResetParticipantsFailWhenNotPaused() public {
        string memory name1 = "test1";
        string memory name2 = "test2";
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, 1 ether);
        vm.prank(sender1);
        registrationManager.joinIn{value: registrationFee}(name1);

        vm.deal(sender2, 1 ether);
        vm.prank(sender2);
        registrationManager.joinIn{value: registrationFee}(name2);

        vm.expectRevert("Pausable: not paused");
        registrationManager.resetParticipants();
        vm.stopPrank();
    }

    function testResetParticipantsFailWhenNotAdmin() public {
        string memory name1 = "test1";
        string memory name2 = "test2";
        address sender1 = address(1);
        address sender2 = address(2);

        vm.deal(sender1, 1 ether);
        vm.prank(sender1);
        registrationManager.joinIn{value: registrationFee}(name1);

        vm.deal(sender2, 1 ether);
        vm.prank(sender2);
        registrationManager.joinIn{value: registrationFee}(name2);

        vm.expectRevert(
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0x0000000000000000000000000000000000000000000000000000000000000000"
        );
        vm.startPrank(sender1);
        registrationManager.pause();
        vm.stopPrank();
    }

    function testPause() public {
        registrationManager.pause();
        vm.stopPrank();

        assertTrue(registrationManager.paused());
    }

    function testUnpause() public {
        registrationManager.pause();
        registrationManager.unpause();
        vm.stopPrank();

        assertTrue(!registrationManager.paused());
    }
}
