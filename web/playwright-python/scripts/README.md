# Scripts

## verify-dom-structure.js

Browser console script for verifying DOM selectors during test development.

**Usage:**
1. Open browser developer tools (F12)
2. Navigate to Console tab
3. Copy and paste the entire script
4. Run verification commands:
   - `DOMVerifier.runCompleteVerification()` - Complete verification
   - `checkSelector("your-selector")` - Check specific selector
   - `highlight("your-selector")` - Highlight matching elements