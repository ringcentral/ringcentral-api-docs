
# Introduction to Global Business SMS


Welcome to the RingCentral developer community! As part of our commitment to expanding our global communications suite, **Messente is now a RingCentral company**.

While we work behind the scenes to deeply integrate Messente’s infrastructure into the core RingCentral developer platform, developers can immediately leverage Messente’s powerful Omnichannel messaging APIs to scale their global user engagement.

!!! info "Independent Account Required: To use the capabilities detailed below, you will need to sign up for a separate account directly via the Messente team. [Contact Messente to Sign-up →](https://messente.com/talk-to-sales)"


## What You Can Build
Messente specializes in high-volume, global bulk messaging with smart routing across 190+ countries. Using the Messente Omnichannel API, you can send notifications, verification codes (2FA), and marketing campaigns across multiple conversational platforms using a single, unified payload.

| Channel | Core Capabilities | Best For |
| :--- | :--- | :--- |
| **SMS** | Global reach, carrier-level routing, fallback protection. | 2FA codes, critical alerts, urgent notifications. |
| **WhatsApp** | Rich media (images, PDFs), interactive buttons, verified business profiles. | Customer support, delivery tracking, rich marketing. |
| **RCS** | Branded carousels, suggested actions, high-engagement native Android messaging. | Interactive product showcases, deep link click-throughs. |
| **Viber** | Long-form text (up to 1,000 characters), images, CTA buttons, cost-effective routing. | European and Asian market campaigns, transactional receipts. |

---

## Key Features for Developers

* **Smart Fallback Routing:** If a rich message (like WhatsApp or Viber) fails to deliver due to connectivity or app availability, the API can automatically fall back to standard SMS within seconds to guarantee delivery.
* **Global Compliance Built-In:** Built-in tools to manage sender IDs, templates, and local country regulations automatically, ensuring high deliverability rates.
* **Unified Analytics:** Track delivery statuses, open rates, and conversion metrics across all channels via webhooks or the Messente dashboard.
* **Number lookup:** Check number validity and identify mobile vs. landline phones.

---

## Ready to Explore?

To begin testing or moving your high-volume messaging workloads to Messente, please reach out to their team to get your API keys and sandbox environment provisioned.

### Implementation Flow

1. **Request an Account**
   Visit [Messente](https://messente.com/) and register for a business account

2. **Explore the API Reference** *(Authentication & Endpoints)*
   Review the specialized [Messente Omnichannel Documentation](https://messente.com/documentation/) for authentication protocols and base URLs.

3. **Configure Webhooks** *(Real-time Delivery Status)*
   Set up your server endpoints to listen for live delivery receipts (DLRs) and incoming user replies.

---

### Behind the Scenes: What's Next?
We are actively designing a unified developer experience where you will eventually be able to manage your RingCentral UCaaS/CCaaS APIs and Messente bulk messaging tools from a single login, contract, and credential set. Stay tuned to our developer newsletter for integration timelines!