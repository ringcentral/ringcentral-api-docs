import { RingCentralNotificationIntegrationHelper } from 'ringcentral-notification-integration-helper'

const app = new RingCentralNotificationIntegrationHelper()

// Open window with proper params so user can do authorization
// in opened window by RingCentral
app.openWindow(windowUrl: string)
