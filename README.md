[![SecuredMe Education Suite public calendar](https://img.shields.io/badge/SecuredMe%20Education%20Suite-public%20calendar%20%7C%20alpha%20Aug%203%202026-5484ED?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://calendrier.securedme.ca)

**Attribution:** Jean-Sebastien Beaulieu · [ORCID 0009-0007-2904-0443](https://orcid.org/0009-0007-2904-0443) · [SecuredMe](https://securedme.ca) · [AlgoQuest](https://algoquest.securedme.ca)

<!-- SECUREDME-SUITE-BADGES:START -->
[![Issues](https://img.shields.io/github/issues/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-?color=161B6A)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/issues)
[![Milestones](https://img.shields.io/badge/milestones-M0--M7-23B8FF)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/milestones)
[![Project Board](https://img.shields.io/badge/project-kanban-6F42FF)](https://github.com/users/SeCuReDmE-main-dev/projects/3)
[![Branch](https://img.shields.io/badge/branch-main-0E7490)](https://github.com/SeCuReDmE-main-dev/algoquest-ams-discovry-labs-module-/tree/main)
<!-- SECUREDME-SUITE-BADGES:END -->

<!-- SECUREDME-STARTUP-SUPPORT:START -->
<p align="center">
  <a href="https://e2b.dev/startups">
    <img alt="Supported by E2B for Startups" src="https://img.shields.io/badge/Supported%20by-E2B%20for%20Startups-FF8800?style=for-the-badge" />
  </a>
  <a href="https://www.datadoghq.com/partner/datadog-for-startups/">
    <img alt="Supported by Datadog for Startups" src="https://img.shields.io/badge/Supported%20by-Datadog%20for%20Startups-632CA6?style=for-the-badge&amp;logo=datadog&amp;logoColor=white" />
  </a>
</p>

> **Startup support acknowledgement.** This SecuredMe school tool is part of the suite supported through E2B for Startups and Datadog for Startups. E2B is used as an optional isolated sandbox and audit lane; Datadog is used as an optional observability and review-support lane. No E2B or Datadog secret is stored in this README.
<!-- SECUREDME-STARTUP-SUPPORT:END -->



## School Authentication And Secret Boundary
This repository is a small SecuredMe school tool. Official classroom use must not require `.env` files, API keys, raw tokens, or local model secrets. Student and teacher workflows must use Codex/OpenAI or Antigravity/Gemini through browser WebAuth, fingerprinted session approval, and encrypted local session records when authentication is needed.

The reason for excluding generic local AI routes from official school mode is student and teacher safety: education accounts, provider-side account controls, browser login, and governed AI refusal behavior are safer than unguided local model endpoints for classroom cybersecurity and algorithm-building tools.

> **Development status.** This school tool is currently tagged **pre-alpha / in development**. External PRs are not evaluated for merge until the maintained tool reaches a stable, fully functional 100% classroom release after the pre-alpha phase. Issues and forks remain allowed, but official PR review is paused until that stability gate is met.

> **SecuredMe Education visual theme.** This pre-alpha school tool uses the shared SecuredMe Education open-source visual identity. See [assets/securedme/education](assets/securedme/education) for light/dark logo and thin banner assets.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AlgoQuest: Algorithm Discovery Lab

> **Official school governance.** AlgoQuest is for supervised algorithm and discovery-lab education. It is not a tool for theft, fraud, bypass, abuse, or criminal automation. The maintained classroom route supports Codex/OpenAI or Antigravity/Gemini only. See [SCHOOL_TOOL_GOVERNANCE.md](SCHOOL_TOOL_GOVERNANCE.md) and [AGENTS.md](AGENTS.md).

> **License.** This project uses the Secured Educational License 2.0 (SEL-2.0). See [LICENSE](LICENSE), [NOTICE](NOTICE), and [DISCLAIMER](DISCLAIMER).

This repository contains a pre-alpha SecuredMe Education classroom app for exploring algorithmic thinking. It runs locally without a Gemini API key, `.env.local`, shared token, or embedded AI secret. Codex/OpenAI and Antigravity/Gemini remain approved external school companions through browser-authenticated workflows.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`






