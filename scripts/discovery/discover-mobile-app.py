#!/usr/bin/env python3
"""
Mobile App Discovery Script (Appium)

Scans a mobile app via Appium and extracts:
- All resource-ids (Android) / accessibility identifiers (iOS)
- View hierarchy with element types
- Clickable/tappable elements
- Text content visible on screen
- Scrollable containers

Usage:
  python discover-mobile-app.py [--platform android|ios] [--output report.json]

Requires: Appium server running, device/emulator connected
"""

import json
import argparse
import os
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.options.ios import XCUITestOptions


def discover_android(driver):
    elements = []
    source = driver.page_source

    # All elements with resource-id
    for el in driver.find_elements('xpath', '//*[@resource-id!=""]'):
        try:
            elements.append({
                'type': 'resource-id',
                'value': el.get_attribute('resource-id'),
                'class': el.get_attribute('class'),
                'text': el.text or '',
                'clickable': el.get_attribute('clickable') == 'true',
                'enabled': el.is_enabled(),
                'displayed': el.is_displayed(),
                'bounds': el.get_attribute('bounds'),
                'selector': f'resource-id={el.get_attribute("resource-id")}',
            })
        except Exception:
            pass

    # All elements with content-desc (accessibility)
    for el in driver.find_elements('xpath', '//*[@content-desc!=""]'):
        try:
            elements.append({
                'type': 'content-desc',
                'value': el.get_attribute('content-desc'),
                'class': el.get_attribute('class'),
                'text': el.text or '',
                'clickable': el.get_attribute('clickable') == 'true',
                'selector': f'accessibility id={el.get_attribute("content-desc")}',
            })
        except Exception:
            pass

    # All visible text
    texts = []
    for el in driver.find_elements('class name', 'android.widget.TextView'):
        try:
            if el.text:
                texts.append(el.text)
        except Exception:
            pass

    return {'elements': elements, 'visibleTexts': texts, 'pageSource': source}


def discover_ios(driver):
    elements = []
    source = driver.page_source

    # All elements with accessibility identifier
    for el in driver.find_elements('xpath', '//*[@name!=""]'):
        try:
            elements.append({
                'type': 'accessibility-id',
                'value': el.get_attribute('name'),
                'class': el.get_attribute('type'),
                'label': el.get_attribute('label') or '',
                'enabled': el.is_enabled(),
                'displayed': el.is_displayed(),
                'selector': f'accessibility id={el.get_attribute("name")}',
            })
        except Exception:
            pass

    # All visible text
    texts = []
    for el in driver.find_elements('class name', 'XCUIElementTypeStaticText'):
        try:
            if el.text:
                texts.append(el.text)
        except Exception:
            pass

    return {'elements': elements, 'visibleTexts': texts, 'pageSource': source}


def main():
    parser = argparse.ArgumentParser(description='Discover mobile app elements')
    parser.add_argument('--platform', default=os.getenv('PLATFORM_NAME', 'Android'))
    parser.add_argument('--output', default='mobile-discovery-report.json')
    parser.add_argument('--appium-url', default=os.getenv('APPIUM_URL', 'http://127.0.0.1:4723'))
    args = parser.parse_args()

    if args.platform.lower() == 'ios':
        options = XCUITestOptions()
        options.device_name = os.getenv('IOS_DEVICE_NAME', 'iPhone 15')
        options.platform_version = os.getenv('IOS_PLATFORM_VERSION', '17.4')
        options.bundle_id = os.getenv('IOS_BUNDLE_ID', 'com.apple.Preferences')
    else:
        options = UiAutomator2Options()
        options.device_name = os.getenv('DEVICE_NAME', 'emulator-5554')
        options.app_package = os.getenv('APP_PACKAGE', 'com.android.settings')
        options.app_activity = os.getenv('APP_ACTIVITY', '.Settings')

    print(f'Connecting to {args.appium_url} ({args.platform})...')
    driver = webdriver.Remote(args.appium_url, options=options)

    try:
        print('Scanning app...')
        if args.platform.lower() == 'ios':
            result = discover_ios(driver)
        else:
            result = discover_android(driver)

        result['platform'] = args.platform
        result['timestamp'] = __import__('datetime').datetime.now().isoformat()

        # Save without pageSource in summary (too large)
        page_source = result.pop('pageSource')
        with open(args.output, 'w') as f:
            json.dump(result, f, indent=2)

        source_file = args.output.replace('.json', '-source.xml')
        with open(source_file, 'w') as f:
            f.write(page_source)

        print(f'Report saved to {args.output}')
        print(f'Page source saved to {source_file}')
        print(f'  Elements found: {len(result["elements"])}')
        print(f'  Visible texts: {len(result["visibleTexts"])}')
    finally:
        driver.quit()


if __name__ == '__main__':
    main()
