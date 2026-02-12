package smoke;

import com.intuit.karate.junit5.Karate;

class SmokeRunner {
    
    @Karate.Test
    Karate testSmoke() {
        return Karate.run("smoke").relativeTo(getClass());
    }
}