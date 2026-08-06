
# Introduction to Global Business SMS

!!! info "Independent Account Required: To get started contact [developer relations](https://developers.ringcentral.com/sms-api#requestinfo)"


## What You Can Build
Global Business SMS is ideal for high-volume, global bulk messaging with smart routing across 190+ countries. You can send notifications, verification codes (2FA), and marketing campaigns across multiple conversational platforms using a single, unified payload.

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
* **Unified Analytics:** Track delivery statuses, open rates, and conversion metrics across all channels via webhooks or the dashboard.
* **Number lookup:** Check number validity and identify mobile vs. landline phones.

---

## Ready to Explore?

To begin testing or moving your high-volume messaging workloads to Ring Central, please reach out to their team to get your API keys and sandbox environment provisioned.

### Implementation Flow

1. **Request an Account**
   Contact [developer relations](https://developers.ringcentral.com/sms-api#requestinfo) and register for a business account

2. **Explore the API Reference** *(Authentication & Endpoints)*
   Review the documentation for authentication protocols and base URLs.

3. **Configure Webhooks** *(Real-time Delivery Status)*
   Set up your server endpoints to listen for live delivery receipts (DLRs) and incoming user replies.

---

### Behind the Scenes: What's Next?
We are actively designing a unified developer experience where you will eventually be able to manage your RingCentral UCaaS/CCaaS APIs and Global Bussiness SMS messaging tools from a single login, contract, and credential set. Stay tuned to our developer newsletter for integration timelines!
