# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SARA (Service Automated Risk Assessment) is a React Native mobile application built with Expo for field service technicians to conduct automated risk assessments. The app is a mockup designed to replicate the Grundfos SARA application with a complete risk evaluation workflow.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run android    # Android device/emulator
npm run ios        # iOS device/simulator (macOS only)
npm run web        # Web browser
```

## Architecture

### Navigation Flow
The app uses React Navigation (Stack Navigator) with a linear workflow:
1. **Home** → Basic job information and user details
2. **PreTask** → Pre-task analysis questionnaire
3. **PhotoUpload** → Capture work area photos
4. **RiskAssessment** → Select applicable risks
5. **RiskDetail** → View detailed risk information (accessed from RiskAssessment)
6. **RiskMatrix** → Evaluate risks using probability/severity matrix
7. **Summary** → Review assessment results
8. **RiskReassessment** → Re-evaluate with additional controls (if needed)
9. **Congratulations** → Completion screen

All navigation is configured in `App.js` with `headerShown: false` for custom headers.

### State Management
- **Local useState**: All screens use React's useState hook for component-level state
- **Navigation params**: Data flows between screens via `navigation.navigate(screen, params)`
- **No global state**: No Redux, Context API, or other global state management is used

Key data passing patterns:
- RiskAssessment → RiskMatrix: `{ selectedRisks: [], otherRiskText: '' }`
- RiskMatrix → Summary: Risk evaluation results
- Summary → RiskReassessment: Risks requiring reassessment

### Theming System
Centralized color system in `theme/colors.js`:
- **Brand colors**: `primary` (#003D5C - Grundfos dark blue), `secondary` (#00A9CE)
- **Risk colors**: `green`, `yellow`, `red`, `black` mapped to risk levels
- **Risk matrix configuration**: Defines risk level ranges and labels

To customize colors, edit `theme/colors.js` only. All components import from this single source.

### Test Data
All mock data is centralized in `data/fakeData.js`:
- `countries` / `languages`: Localization options
- `userInfo` / `jobInfo`: Pre-populated user/job fields
- `riskTypes`: 18 risk categories with icons, descriptions, and control measures
- `preTaskQuestions`: Pre-task analysis questionnaire items

### Component Architecture
- **Header component** (`components/Header.js`): Reusable header with help, exit, and SIMS buttons
- **Screen components** (`screens/*.js`): Self-contained screens with embedded styles
- **StyleSheet pattern**: Each screen uses React Native StyleSheet at file bottom
- **No component library**: Uses only React Native core components

### Risk Assessment Logic
Risk matrix calculation in `theme/colors.js`:
- Green (1-2): Low risk - proceed
- Yellow (3-6): Moderate risk - proceed with caution
- Red (8-12): High risk - implement controls before proceeding
- Black (16): Extreme risk - stop immediately

Risk scores are calculated as: `probability × severity`

## Key Files

- `App.js`: Navigation configuration and screen registration
- `theme/colors.js`: Color system and risk matrix configuration
- `data/fakeData.js`: All test data and risk definitions
- `components/Header.js`: Shared header component
- `metro.config.js`: Metro bundler config with cache reset enabled

## Platform Considerations

- **Expo SDK ~54**: Project uses Expo managed workflow
- **React 19.1.0 / React Native 0.81.5**: Latest stable versions
- **iOS**: Tablet support enabled in app.json
- **Android**: Uses adaptive icon configuration
- **Web**: Includes web support via Expo

## Development Notes

- The app uses custom dropdowns instead of Picker components for cross-platform consistency
- Photo upload uses expo-image-picker
- All text inputs use controlled components (value + onChangeText)
- Alert dialogs are used for simple notifications (Help/Exit buttons)
- No backend integration - fully client-side mockup
