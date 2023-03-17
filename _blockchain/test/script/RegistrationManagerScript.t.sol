// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "../../lib/forge-std/src/Test.sol";
import "../../src/RegistrationManager.sol";
import "../../script/RegistrationManager.s.sol";

contract RegistrationManagerScriptTest is Test {
    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;
    uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

    RegistrationManagerScript registrationManagerScript;

    function setUp() public {
        registrationManagerScript = new RegistrationManagerScript();
    }

    function testDeploy() public {
        registrationManagerScript.run();
    }
}
