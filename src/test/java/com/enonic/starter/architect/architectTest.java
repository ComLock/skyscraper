package com.enonic.starter.architect;

import com.enonic.xp.testing.script.ScriptRunnerSupport;

public class architectTest extends ScriptRunnerSupport {

    @Override
    public String getScriptTestFile() {
        return "/site/parts/architect/architect-test.js";
    }
}
