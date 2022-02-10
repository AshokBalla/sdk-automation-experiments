# SDK Automation & Testing Experiments

A comprehensive collection of SDK automation patterns, testing frameworks, and integration experiments. This repository demonstrates professional testing strategies for complex SDK environments, including tokenization, authentication, and regional payment flows.

## 🚀 Overview

This repository showcases:
- **Modular SDK Architecture:** Clean wrappers for regional payment services.
- **Advanced Testing Patterns:** Page Object Model (POM), Cucumber (BDD), and Jest integration.
- **Security & Validation:** Webhook signature verification and secure tokenization flows.
- **CI/CD Readiness:** GitHub Actions workflows for multi-environment validation.

## 📁 Repository Structure

- `apex-ach-sdk/` - Apex Payment ACH tokenization and validation.
- `regiona-credit-card-sdk/` - Regionalized credit card SDK automation for RegionA.
- `src/` - Core SDK wrappers and utility functions.
- `tests/` - Comprehensive test suites including unit and integration tests.

## 🧪 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

### Installation
```bash
npm install
```

### Running Tests
To run the core SDK unit tests:
```bash
npm test
```

To run individual module tests (e.g., Apex ACH):
```bash
cd apex-ach-sdk
npm install
npm test
```

## 🛠 Features

- **Authentication Flows:** Demonstrates mocked HTTP clients for secure API authentication.
- **Webhook Verification:** Logic for SHA-256 HMAC signature validation.
- **Error Handling:** Robust wrapping and propagation of API error states.
- **Coverage:** High-coverage test suites with detailed reporting.

## 📈 Evolution

This repository has evolved over the last 3 years from initial proof-of-concept scripts to a mature, multi-module automation framework. It reflects a deep understanding of SDK lifecycle management and cross-platform testing.
