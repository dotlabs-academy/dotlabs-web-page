// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../lib/forge-std/src/Test.sol";
import "../src/RegistrationManager.sol";

contract RegistrationManagerTest is Test {
    RegistrationManager registrationManager;
    uint256 registrationFee;

    address ASoto = 0x820FAec66A504901De79fa44D21609d457174f5B;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

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
        vm.prank(ASoto);
        registrationManager.pause();

        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.expectRevert("Pausable: paused");
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);
    }

    function testConfirmParticipant() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        vm.startPrank(ASoto);
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
        vm.startPrank(ASoto);
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
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775"
        );
        vm.startPrank(sender);
        registrationManager.pause();
        vm.stopPrank();
    }

    function testRefundFee() public {
        string memory name = "test";
        address sender = address(1);

        vm.deal(sender, 1 ether);
        vm.prank(sender);
        registrationManager.joinIn{value: registrationFee}(name);

        vm.startPrank(ASoto);
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
        vm.startPrank(ASoto);
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
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775"
        );
        vm.startPrank(sender);
        registrationManager.pause();
        vm.stopPrank();
    }

    function testGetConfirmedParticipants() public {
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

        vm.startPrank(ASoto);
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);
        vm.stopPrank();

        Participant[] memory confirmedParticipants = registrationManager.getConfirmedParticipants();

        assertEq(confirmedParticipants.length, 2);
        assertEq(confirmedParticipants[0].name, name1);
        assertEq(confirmedParticipants[1].name, name2);
    }

    function testGetConfirmedParticipantsWhenNone() public {
        Participant[] memory confirmedParticipants = registrationManager.getConfirmedParticipants();

        assertEq(confirmedParticipants.length, 0);
    }

    function testUnconfirmedParticipants() public {
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

        vm.startPrank(ASoto);
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        vm.stopPrank();

        Participant[] memory unconfirmedParticipants = registrationManager.getUnconfirmedParticipants();

        assertEq(unconfirmedParticipants.length, 2);
        assertEq(unconfirmedParticipants[0].name, name2);
    }

    function testUnconfirmedParticipantsWhenNone() public {
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

        vm.startPrank(ASoto);
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);
        vm.stopPrank();

        Participant[] memory unconfirmedParticipants = registrationManager.getUnconfirmedParticipants();

        assertEq(unconfirmedParticipants.length, 2);
        assertEq(unconfirmedParticipants[0].name, "");
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

        vm.startPrank(ASoto);
        registrationManager.pause();
        registrationManager.confirmParticipant(sender1);
        registrationManager.confirmParticipant(sender2);
        registrationManager.resetParticipants();
        vm.stopPrank();

        Participant[] memory confirmedParticipants = registrationManager.getConfirmedParticipants();
        Participant[] memory unconfirmedParticipants = registrationManager.getUnconfirmedParticipants();
        Participant[] memory participants = registrationManager.getParticipants();

        assertEq(confirmedParticipants.length, 0);
        assertEq(unconfirmedParticipants.length, 0);
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

        vm.startPrank(ASoto);
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
            "AccessControl: account 0x0000000000000000000000000000000000000001 is missing role 0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775"
        );
        vm.startPrank(sender1);
        registrationManager.pause();
        vm.stopPrank();
    }

    function testPause() public {
        vm.startPrank(ASoto);
        registrationManager.pause();
        vm.stopPrank();

        assertTrue(registrationManager.paused());
    }

    function testUnpause() public {
        vm.startPrank(ASoto);
        registrationManager.pause();
        registrationManager.unpause();
        vm.stopPrank();

        assertTrue(!registrationManager.paused());
    }
}
