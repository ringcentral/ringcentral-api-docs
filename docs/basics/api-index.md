# RingCentral Office API Reference Index

Welcome to a simple index of RingCentral Office API endpoints, provided as a convenience for those who need a quick way to find a specific endpoint. For a complete reference, check out RingCentral's [complete and interactive Office API Reference](https://developer.ringcentral.com/api-reference).


### API Info

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAPIVersions" aria-expanded="true" aria-controls="readAPIVersions">Get API Versions</a> <a href="https://developers.ringcentral.com/api-reference/API-Info/readAPIVersions">#</a></td>
      <td class="description"><p>Returns current API version(s) and server info.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAPIVersions" class="collapse" aria-labelledby="readAPIVersions">
          <p>GET https://platform.ringcentral.com/restapi</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAPIVersion" aria-expanded="true" aria-controls="readAPIVersion">Get Version Info</a> <a href="https://developers.ringcentral.com/api-reference/API-Info/readAPIVersion">#</a></td>
      <td class="description"><p>Returns current API version info by apiVersion.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAPIVersion" class="collapse" aria-labelledby="readAPIVersion">
          <p>GET https://platform.ringcentral.com/restapi/{apiVersion}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAPIStatus" aria-expanded="true" aria-controls="readAPIStatus">Get Service Status</a> <a href="https://developers.ringcentral.com/api-reference/API-Info/readAPIStatus">#</a></td>
      <td class="description"><p>Returns current PAS service status.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAPIStatus" class="collapse" aria-labelledby="readAPIStatus">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/status</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Automatic Location Updates

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listAutomaticLocationUpdatesUsers" aria-expanded="true" aria-controls="listAutomaticLocationUpdatesUsers">Get User List</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listAutomaticLocationUpdatesUsers">#</a></td>
      <td class="description"><p>Returns the list of users with their status of Automatic Location Updates feature.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listAutomaticLocationUpdatesUsers" class="collapse" aria-labelledby="listAutomaticLocationUpdatesUsers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/users</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">department</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Department name to filter the users. The value range is 0-64; not case-sensitive. If not specified then the parameter is ignored. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">featureEnabled</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Filters entries by their status of Automatic Location Updates feature</td>
            </tr>
<tr>
	      <td class="n">orderBy</td>
	      <td class="t">string</td>
	      <td class="d">name</td>
	      <td class="r">false</td>
	      <td class="de">Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). Supported values: 'name', 'modelName', 'siteName', 'featureEnabled'</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are supported</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page</td>
            </tr>
<tr>
	      <td class="n">searchString</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Filters entries containing the specified substring in user name, extension or department. The characters range is 0-64; not case-sensitive. If empty then the filter is ignored</td>
            </tr>
<tr>
	      <td class="n">siteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of a site. To filter users of Main Site (Company) `main-site` must be specified. Supported only If Multi-Site feature is enabled for the account. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Extension type. Multiple values are supported</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#assignMultipleAutomaticaLocationUpdatesUsers" aria-expanded="true" aria-controls="assignMultipleAutomaticaLocationUpdatesUsers">Enable Automatic Location Updates for Users</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/assignMultipleAutomaticaLocationUpdatesUsers">#</a></td>
      <td class="description"><p>Enables or disables Automatic Location Updates feature for multiple account users.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="assignMultipleAutomaticaLocationUpdatesUsers" class="collapse" aria-labelledby="assignMultipleAutomaticaLocationUpdatesUsers">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/users/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listWirelessPoints" aria-expanded="true" aria-controls="listWirelessPoints">Get Wireless Point List</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listWirelessPoints">#</a></td>
      <td class="description"><p>Returns account wireless points configured and used for Automatic Location Updates feature.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listWirelessPoints" class="collapse" aria-labelledby="listWirelessPoints">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">orderBy</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Comma-separated list of fields to order results prefixed by '+' sign (ascending order) or '-' sign (descending order). The default sorting is by `name`</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are supported</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page</td>
            </tr>
<tr>
	      <td class="n">searchString</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Filters entries by the specified substring (search by chassis ID, switch name or address) The characters range is 0-64 (if empty the filter is ignored)</td>
            </tr>
<tr>
	      <td class="n">siteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a site. To filter Main Site (Company) 'main-site' must be specified. Supported only If multi-site feature is enabled for the account</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createWirelessPoint" aria-expanded="true" aria-controls="createWirelessPoint">Create Wireless Point</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createWirelessPoint">#</a></td>
      <td class="description"><p>Creates a new wireless point in network configuration with the emergency address assigned.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createWirelessPoint" class="collapse" aria-labelledby="createWirelessPoint">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readWirelessPoint" aria-expanded="true" aria-controls="readWirelessPoint">Get Wireless Point</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readWirelessPoint">#</a></td>
      <td class="description"><p>Returns the specified wireless access point of a corporate map with the emergency address assigned.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readWirelessPoint" class="collapse" aria-labelledby="readWirelessPoint">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points/{pointId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">pointId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateWirelessPoint" aria-expanded="true" aria-controls="updateWirelessPoint">Update Wireless Point</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateWirelessPoint">#</a></td>
      <td class="description"><p>Updates the specified wireless access point of a corporate map by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateWirelessPoint" class="collapse" aria-labelledby="updateWirelessPoint">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points/{pointId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">pointId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteWirelessPoint" aria-expanded="true" aria-controls="deleteWirelessPoint">Delete Wireless Point</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/deleteWirelessPoint">#</a></td>
      <td class="description"><p>Deletes wireless point(s) of a corporate map by ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteWirelessPoint" class="collapse" aria-labelledby="deleteWirelessPoint">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points/{pointId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">pointId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listNetworks" aria-expanded="true" aria-controls="listNetworks">Get Network Map</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listNetworks">#</a></td>
      <td class="description"><p>Returns corporate networks map with emergency addresses assigned to the current account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listNetworks" class="collapse" aria-labelledby="listNetworks">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createNetwork" aria-expanded="true" aria-controls="createNetwork">Create Network</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createNetwork">#</a></td>
      <td class="description"><p>Creates a new network in corporate ethernet map for assignment of emergency addresses to network access points.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createNetwork" class="collapse" aria-labelledby="createNetwork">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readNetwork" aria-expanded="true" aria-controls="readNetwork">Get Network</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readNetwork">#</a></td>
      <td class="description"><p>Returns the specified network with emergency addresses assigned to the current account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readNetwork" class="collapse" aria-labelledby="readNetwork">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks/{networkId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">networkId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateNetwork" aria-expanded="true" aria-controls="updateNetwork">Update Network</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateNetwork">#</a></td>
      <td class="description"><p>Updates network in corporate ethernet map for assignment of emergency addresses to network access points.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateNetwork" class="collapse" aria-labelledby="updateNetwork">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks/{networkId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">networkId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteNetwork" aria-expanded="true" aria-controls="deleteNetwork">Delete Network</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/deleteNetwork">#</a></td>
      <td class="description"><p>Deletes network(s) in corporate ethernet map for Automatic Location Updates feature.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteNetwork" class="collapse" aria-labelledby="deleteNetwork">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/networks/{networkId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">networkId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listDevicesAutomaticLocationUpdates" aria-expanded="true" aria-controls="listDevicesAutomaticLocationUpdates">Get Device List</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listDevicesAutomaticLocationUpdates">#</a></td>
      <td class="description"><p>Returns the list of common devices with their status of Automatic Location Updates feature.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listDevicesAutomaticLocationUpdates" class="collapse" aria-labelledby="listDevicesAutomaticLocationUpdates">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/devices</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">compatibleOnly</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Filters devices which support HELD protocol</td>
            </tr>
<tr>
	      <td class="n">featureEnabled</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Filters entries by their status of Automatic Location Updates feature</td>
            </tr>
<tr>
	      <td class="n">model</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of a device model for filtering. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">orderBy</td>
	      <td class="t">string</td>
	      <td class="d">name</td>
	      <td class="r">false</td>
	      <td class="de">Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). Supported values: 'name', 'modelName', 'siteName', 'featureEnabled'</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are supported</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page</td>
            </tr>
<tr>
	      <td class="n">searchString</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Filters entries which have device name or model name containing the mentioned substring. The value should be split by spaces; the range is 0 - 64 characters, not case-sensitive. If empty the filter is ignored</td>
            </tr>
<tr>
	      <td class="n">siteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of a site. To filter devices of Main Site (Company) `main-site` must be specified. Supported only If Multi-Site feature is enabled for the account</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#assignMultipleDevicesAutomaticLocationUpdates" aria-expanded="true" aria-controls="assignMultipleDevicesAutomaticLocationUpdates">Enable Automatic Location Updates for Devices</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/assignMultipleDevicesAutomaticLocationUpdates">#</a></td>
      <td class="description"><p>Enables or disables Automatic Location Updates feature for the specified common phones.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="assignMultipleDevicesAutomaticLocationUpdates" class="collapse" aria-labelledby="assignMultipleDevicesAutomaticLocationUpdates">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/devices/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listAccountSwitches" aria-expanded="true" aria-controls="listAccountSwitches">Get Account Switch List</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listAccountSwitches">#</a></td>
      <td class="description"><p>Returns corporate map of configured network switches with the assigned emergency addresses for the logged-in account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listAccountSwitches" class="collapse" aria-labelledby="listAccountSwitches">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">orderBy</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Comma-separated list of fields to order results prefixed by '+' sign (ascending order) or '-' sign (descending order). The default sorting is by `name`</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are supported</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page</td>
            </tr>
<tr>
	      <td class="n">searchString</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Filters entries by the specified substring (search by chassis ID, switch name or address) The characters range is 0-64 (if empty the filter is ignored)</td>
            </tr>
<tr>
	      <td class="n">siteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a site. To filter Main Site (Company) main-site must be specified. Supported only If multi-site feature is enabled for the account</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createSwitch" aria-expanded="true" aria-controls="createSwitch">Create Switch</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createSwitch">#</a></td>
      <td class="description"><p>Creates a new switch in corporate map based on chassis ID and used for Automatic Locations Update feature.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createSwitch" class="collapse" aria-labelledby="createSwitch">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readSwitch" aria-expanded="true" aria-controls="readSwitch">Get Switch</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readSwitch">#</a></td>
      <td class="description"><p>Returns the specified switch with the assigned emergency address.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readSwitch" class="collapse" aria-labelledby="readSwitch">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches/{switchId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">switchId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateSwitch" aria-expanded="true" aria-controls="updateSwitch">Update Switch</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateSwitch">#</a></td>
      <td class="description"><p>Updates switch. Partial update is not supported, all switch parameters should be specified. If null value is received or parameter is missing, its value is removed.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateSwitch" class="collapse" aria-labelledby="updateSwitch">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches/{switchId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">switchId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteSwitch" aria-expanded="true" aria-controls="deleteSwitch">Delete Switch</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/deleteSwitch">#</a></td>
      <td class="description"><p>Deletes wireless switch(es) in network configuration for Automatic Location Updates feature.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteSwitch" class="collapse" aria-labelledby="deleteSwitch">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches/{switchId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">switchId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createMultipleSwitches" aria-expanded="true" aria-controls="createMultipleSwitches">Create Multiple Switches</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createMultipleSwitches">#</a></td>
      <td class="description"><p>Creates multiple switches in corporate map. The maximum number of switches per request is 10 000; limitation for account is 10 000.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createMultipleSwitches" class="collapse" aria-labelledby="createMultipleSwitches">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches-bulk-create</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateMultipleSwitches" aria-expanded="true" aria-controls="updateMultipleSwitches">Update Multiple Switches</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateMultipleSwitches">#</a></td>
      <td class="description"><p>Updates multiple switches in corporate map. The maximum number of switches per request is 10 000; limitation for account is 10 000.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateMultipleSwitches" class="collapse" aria-labelledby="updateMultipleSwitches">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches-bulk-update</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createMultipleWirelessPoints" aria-expanded="true" aria-controls="createMultipleWirelessPoints">Create Multiple Wireless Points</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createMultipleWirelessPoints">#</a></td>
      <td class="description"><p>Creates multiple wireless points in corporate map. The maximum number of wireless points per request is 10 000; limitation for account is 70 000.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createMultipleWirelessPoints" class="collapse" aria-labelledby="createMultipleWirelessPoints">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points-bulk-create</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateMultipleWirelessPoints" aria-expanded="true" aria-controls="updateMultipleWirelessPoints">Update Multiple Wireless Points</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateMultipleWirelessPoints">#</a></td>
      <td class="description"><p>Updates wireless points in corporate map. The maximum number of wireless points per request is 10 000; limitation for account is 70 000.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateMultipleWirelessPoints" class="collapse" aria-labelledby="updateMultipleWirelessPoints">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points-bulk-update</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#validateMultipleWirelessPoints" aria-expanded="true" aria-controls="validateMultipleWirelessPoints">Validate Multiple Wireless Points</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/validateMultipleWirelessPoints">#</a></td>
      <td class="description"><p>Validates wireless points before creation or update. The maximum number of wireless points per request is 10 000.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="validateMultipleWirelessPoints" class="collapse" aria-labelledby="validateMultipleWirelessPoints">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/wireless-points-bulk-validate</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#validateMultipleSwitches" aria-expanded="true" aria-controls="validateMultipleSwitches">Validate Multiple Switches</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/validateMultipleSwitches">#</a></td>
      <td class="description"><p>Validates switches before creation or update. The maximum number of switches per request is 10 000.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="validateMultipleSwitches" class="collapse" aria-labelledby="validateMultipleSwitches">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/switches-bulk-validate</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAutomaticLocationUpdatesTask" aria-expanded="true" aria-controls="readAutomaticLocationUpdatesTask">Get Emergency Map Configuration Task</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readAutomaticLocationUpdatesTask">#</a></td>
      <td class="description"><p>Returns results of the task created within the frame of Automatic Location Updates feature. Currently four task types are supported: 'Wireless Points Bulk Create', 'Wireless Points Bulk Update', 'Switches Bulk Create', 'Switches Bulk Update'</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAutomaticLocationUpdatesTask" class="collapse" aria-labelledby="readAutomaticLocationUpdatesTask">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-address-auto-update/tasks/{taskId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createEmergencyLocation" aria-expanded="true" aria-controls="createEmergencyLocation">Add Emergency Location</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/createEmergencyLocation">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createEmergencyLocation" class="collapse" aria-labelledby="createEmergencyLocation">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listEmergencyLocations" aria-expanded="true" aria-controls="listEmergencyLocations">Get Emergency Location List</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/listEmergencyLocations">#</a></td>
      <td class="description"><p>Returns emergency response locations of the current account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listEmergencyLocations" class="collapse" aria-labelledby="listEmergencyLocations">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">addressStatus</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">domesticCountryId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">orderBy</td>
	      <td class="t">string</td>
	      <td class="d">address</td>
	      <td class="r">false</td>
	      <td class="de">Comma-separated list of fields to order results prefixed by plus sign '+' (ascending order) or minus sign '-' (descending order). Supported values: 'address'</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are supported</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Indicates the page size (number of items). The values supported: `Max` or numeric value. If not specified, 100 records are returned per one page</td>
            </tr>
<tr>
	      <td class="n">searchString</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Filters entries containing the specified substring in address and name fields. The characters range is 0-64; not case-sensitive. If empty then the filter is ignored</td>
            </tr>
<tr>
	      <td class="n">siteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of a site for filtering. To filter by Main Site (Company) `main-site` value should be specified</td>
            </tr>
<tr>
	      <td class="n">usageStatus</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readEmergencyLocation" aria-expanded="true" aria-controls="readEmergencyLocation">Get Emergency Location</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/readEmergencyLocation">#</a></td>
      <td class="description"><p>Returns emergency response location by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readEmergencyLocation" class="collapse" aria-labelledby="readEmergencyLocation">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations/{locationId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">locationId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of the emergency location</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateEmergencyLocation" aria-expanded="true" aria-controls="updateEmergencyLocation">Update Emergency Location</a> <a href="https://developers.ringcentral.com/api-reference/Automatic-Location-Updates/updateEmergencyLocation">#</a></td>
      <td class="description"><p>Updates the specified emergency response location.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateEmergencyLocation" class="collapse" aria-labelledby="updateEmergencyLocation">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/emergency-locations/{locationId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">locationId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of the emergency location</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Business Hours

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserBusinessHours" aria-expanded="true" aria-controls="readUserBusinessHours">Get User Business Hours</a> <a href="https://developers.ringcentral.com/api-reference/Business-Hours/readUserBusinessHours">#</a></td>
      <td class="description"><p>Returns the user hours when the call handling rules are applied. <strong>Please note:</strong> If user hours are set to 'Custom hours' then a particular schedule is returned; however if set to '24 hours/7 days a week' an empty schedule is returned.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserBusinessHours" class="collapse" aria-labelledby="readUserBusinessHours">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/business-hours</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateUserBusinessHours" aria-expanded="true" aria-controls="updateUserBusinessHours">Update User Business Hours</a> <a href="https://developers.ringcentral.com/api-reference/Business-Hours/updateUserBusinessHours">#</a></td>
      <td class="description"><p>Updates the extension user hours when answering rules are to be applied.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateUserBusinessHours" class="collapse" aria-labelledby="updateUserBusinessHours">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/business-hours</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCompanyBusinessHours" aria-expanded="true" aria-controls="readCompanyBusinessHours">Get Company Business Hours</a> <a href="https://developers.ringcentral.com/api-reference/Business-Hours/readCompanyBusinessHours">#</a></td>
      <td class="description"><p>Returns company hours when answering rules are to be applied.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCompanyBusinessHours" class="collapse" aria-labelledby="readCompanyBusinessHours">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-hours</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCompanyBusinessHours" aria-expanded="true" aria-controls="updateCompanyBusinessHours">Update Company Business Hours</a> <a href="https://developers.ringcentral.com/api-reference/Business-Hours/updateCompanyBusinessHours">#</a></td>
      <td class="description"><p>Updates company hours when answering rules are to be applied.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCompanyBusinessHours" class="collapse" aria-labelledby="updateCompanyBusinessHours">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-hours</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Calendar Events

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipEvents" aria-expanded="true" aria-controls="readGlipEvents">Get User Events List</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/readGlipEvents">#</a></td>
      <td class="description"><p>Returns all calendar events created by the current user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipEvents" class="collapse" aria-labelledby="readGlipEvents">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/events</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Token of a page to be returned</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of groups to be fetched by one request. The maximum value is 250, by default - 30.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createEvent" aria-expanded="true" aria-controls="createEvent">Create Event</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/createEvent">#</a></td>
      <td class="description"><p>Creates a new calendar event.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createEvent" class="collapse" aria-labelledby="createEvent">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/events</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readEvent" aria-expanded="true" aria-controls="readEvent">Get Event</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/readEvent">#</a></td>
      <td class="description"><p>Returns the specified calendar event(s) by ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readEvent" class="collapse" aria-labelledby="readEvent">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/events/{eventId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateEvent" aria-expanded="true" aria-controls="updateEvent">Update Event</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/updateEvent">#</a></td>
      <td class="description"><p>Updates the specified calendar event.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateEvent" class="collapse" aria-labelledby="updateEvent">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/glip/events/{eventId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">eventId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an event</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteEvent" aria-expanded="true" aria-controls="deleteEvent">Delete Event</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/deleteEvent">#</a></td>
      <td class="description"><p>Deletes the specified calendar event.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteEvent" class="collapse" aria-labelledby="deleteEvent">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/events/{eventId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createEventbyGroupId" aria-expanded="true" aria-controls="createEventbyGroupId">Create Event by Group ID</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/createEventbyGroupId">#</a></td>
      <td class="description"><p>Creates a new calendar event within the specified group.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createEventbyGroupId" class="collapse" aria-labelledby="createEventbyGroupId">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/events</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a group</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGroupEvents" aria-expanded="true" aria-controls="listGroupEvents">Get Group Events</a> <a href="https://developers.ringcentral.com/api-reference/Calendar-Events/listGroupEvents">#</a></td>
      <td class="description"><p>Returns a list of calendar events available for the current user within the specified group. Users can only see their personal tasks and public tasks.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGroupEvents" class="collapse" aria-labelledby="listGroupEvents">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/events</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Blocking

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCallerBlockingSettings" aria-expanded="true" aria-controls="readCallerBlockingSettings">Get Caller Blocking Settings</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/readCallerBlockingSettings">#</a></td>
      <td class="description"><p>Returns the current caller blocking settings of a user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCallerBlockingSettings" class="collapse" aria-labelledby="readCallerBlockingSettings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCallerBlockingSettings" aria-expanded="true" aria-controls="updateCallerBlockingSettings">Update Caller Blocking Settings</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/updateCallerBlockingSettings">#</a></td>
      <td class="description"><p>Updates the current caller blocking settings of a user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCallerBlockingSettings" class="collapse" aria-labelledby="updateCallerBlockingSettings">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listBlockedAllowedNumbers" aria-expanded="true" aria-controls="listBlockedAllowedNumbers">Get Blocked/Allowed Phone Numbers</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/listBlockedAllowedNumbers">#</a></td>
      <td class="description"><p>Returns the lists of blocked and allowed phone numbers.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listBlockedAllowedNumbers" class="collapse" aria-labelledby="listBlockedAllowedNumbers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createBlockedAllowedNumber" aria-expanded="true" aria-controls="createBlockedAllowedNumber">Add Blocked/Allowed Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/createBlockedAllowedNumber">#</a></td>
      <td class="description"><p>Updates either blocked or allowed phone number list with a new phone number.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createBlockedAllowedNumber" class="collapse" aria-labelledby="createBlockedAllowedNumber">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readBlockedAllowedNumber" aria-expanded="true" aria-controls="readBlockedAllowedNumber">Get Blocked/Allowed Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/readBlockedAllowedNumber">#</a></td>
      <td class="description"><p>Returns blocked or allowed phone number(s) by their ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readBlockedAllowedNumber" class="collapse" aria-labelledby="readBlockedAllowedNumber">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers/{blockedNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">blockedNumberId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteBlockedAllowedNumber" aria-expanded="true" aria-controls="deleteBlockedAllowedNumber">Delete Blocked/Allowed Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/deleteBlockedAllowedNumber">#</a></td>
      <td class="description"><p>Deletes blocked or allowed phone number(s) by their ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteBlockedAllowedNumber" class="collapse" aria-labelledby="deleteBlockedAllowedNumber">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers/{blockedNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">blockedNumberId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateBlockedAllowedNumber" aria-expanded="true" aria-controls="updateBlockedAllowedNumber">Update Blocked/Allowed Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Blocking/updateBlockedAllowedNumber">#</a></td>
      <td class="description"><p>Updates blocked or allowed phone number(s) by their ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateBlockedAllowedNumber" class="collapse" aria-labelledby="updateBlockedAllowedNumber">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-blocking/phone-numbers/{blockedNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">blockedNumberId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Control

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createCallOutCallSession" aria-expanded="true" aria-controls="createCallOutCallSession">Make CallOut</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/createCallOutCallSession">#</a></td>
      <td class="description"><p>Creates a new outbound call out session.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createCallOutCallSession" class="collapse" aria-labelledby="createCallOutCallSession">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/call-out</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCallSessionStatus" aria-expanded="true" aria-controls="readCallSessionStatus">Get Call Session Status</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/readCallSessionStatus">#</a></td>
      <td class="description"><p>Returns the status of a call session by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCallSessionStatus" class="collapse" aria-labelledby="readCallSessionStatus">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
<tr>
	      <td class="n">timeout</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The time frame of awaiting for a status change before sending the resulting one in response</td>
            </tr>
<tr>
	      <td class="n">timestamp</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The date and time of a call session latest change</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCallSession" aria-expanded="true" aria-controls="deleteCallSession">Drop Call Session</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/deleteCallSession">#</a></td>
      <td class="description"><p>Drops a call session.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCallSession" class="collapse" aria-labelledby="deleteCallSession">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#holdCallParty" aria-expanded="true" aria-controls="holdCallParty">Hold Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/holdCallParty">#</a></td>
      <td class="description"><p>Puts the party to stand-alone mode and starts to play Hold Music according to configuration &amp; state to peers. There is a known limitation for Hold API - hold via REST API doesn't work with hold placed via RingCentral apps or HardPhone. It means that if you muted participant via Call Control API and RingCentral Desktop app, then you need to unhold both endpoints to remove Hold Music and bring media back.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="holdCallParty" class="collapse" aria-labelledby="holdCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/hold</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#unholdCallParty" aria-expanded="true" aria-controls="unholdCallParty">Unhold Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/unholdCallParty">#</a></td>
      <td class="description"><p>Brings a party back into a call and stops to play Hold Music. There is a known limitation for Hold API - hold via REST API doesn't work with hold placed via RingCentral apps or HardPhone. It means that if you muted participant via Call Control API and RingCentral Desktop app, then you need to unhold both endpoints to remove Hold Music and bring media back.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="unholdCallParty" class="collapse" aria-labelledby="unholdCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/unhold</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#rejectParty" aria-expanded="true" aria-controls="rejectParty">Reject Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/rejectParty">#</a></td>
      <td class="description"><p>Rejects an inbound call in a "Setup" or "Proceeding" state</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="rejectParty" class="collapse" aria-labelledby="rejectParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/reject</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#ignoreCallInQueue" aria-expanded="true" aria-controls="ignoreCallInQueue">Ignore Call in Queue</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/ignoreCallInQueue">#</a></td>
      <td class="description"><p>Ignores a call to a call queue agent in <code>Setup</code> or <code>Proceeding</code> state.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="ignoreCallInQueue" class="collapse" aria-labelledby="ignoreCallInQueue">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/ignore</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#transferCallParty" aria-expanded="true" aria-controls="transferCallParty">Transfer Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/transferCallParty">#</a></td>
      <td class="description"><p>Transfers a party by placing a new call to the specified target</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="transferCallParty" class="collapse" aria-labelledby="transferCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/transfer</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Defines a target for a party transfer. Only a single target is allowed</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#bridgeCallParty" aria-expanded="true" aria-controls="bridgeCallParty">Bridge Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/bridgeCallParty">#</a></td>
      <td class="description"><p>Connects two parties from different call sessions.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="bridgeCallParty" class="collapse" aria-labelledby="bridgeCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/bridge</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Defines target call session and call party to be bridged</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#answerCallParty" aria-expanded="true" aria-controls="answerCallParty">Answer Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/answerCallParty">#</a></td>
      <td class="description"><p>Answers a call on a certain device by passing the corresponding device ID in request body. Supported for call forwarding, call transfer, call flip and call queues.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="answerCallParty" class="collapse" aria-labelledby="answerCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/answer</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Distributes a non-answered call to the defined target. Only a single target is allowed</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#pickupCallParty" aria-expanded="true" aria-controls="pickupCallParty">Pickup Call</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/pickupCallParty">#</a></td>
      <td class="description"><p>Picks up a call parked to the specified park location.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="pickupCallParty" class="collapse" aria-labelledby="pickupCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/pickup</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Distributes a non-answered call to the defined target. Only a single target is allowed</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#forwardCallParty" aria-expanded="true" aria-controls="forwardCallParty">Forward Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/forwardCallParty">#</a></td>
      <td class="description"><p>Distributes a non-answered call to the defined target. Applicable for "Setup" or "Proceeding" states</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="forwardCallParty" class="collapse" aria-labelledby="forwardCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/forward</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Distributes a non-answered call to the defined target. Only a single target is allowed</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#replyParty" aria-expanded="true" aria-controls="replyParty">Reply with Text</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/replyParty">#</a></td>
      <td class="description"><p>Replies with text/pattern without picking up a call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="replyParty" class="collapse" aria-labelledby="replyParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/reply</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#callFlipParty" aria-expanded="true" aria-controls="callFlipParty">Call Flip on Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/callFlipParty">#</a></td>
      <td class="description"><p>Performs call flip procedure by holding opposite party and calling to the specified target</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="callFlipParty" class="collapse" aria-labelledby="callFlipParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/flip</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#callParkParty" aria-expanded="true" aria-controls="callParkParty">Call Park</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/callParkParty">#</a></td>
      <td class="description"><p>Parks a call to a virtual location from where it can further be retrieved by any user from any phone of the system. The call session and call party identifiers should be specified in path. Currently the users can park only their own incoming calls. Up to 50 calls can be parked simultaneously. Park location starts with asterisk (*) and ranges 801-899.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="callParkParty" class="collapse" aria-labelledby="callParkParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/park</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCallPartyStatus" aria-expanded="true" aria-controls="readCallPartyStatus">Get Call Party Status</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/readCallPartyStatus">#</a></td>
      <td class="description"><p>Returns a party status of a call session by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCallPartyStatus" class="collapse" aria-labelledby="readCallPartyStatus">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCallParty" aria-expanded="true" aria-controls="deleteCallParty">Delete Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/deleteCallParty">#</a></td>
      <td class="description"><p>Deletes a party of a call session by ID. It is possible to delete only one conference participant per request.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCallParty" class="collapse" aria-labelledby="deleteCallParty">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCallParty" aria-expanded="true" aria-controls="updateCallParty">Update Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/updateCallParty">#</a></td>
      <td class="description"><p>Modify the party of a call session by ID. There is a known limitation for Mute scenario - mute via REST API doesn't work with mute placed via RingCentral apps or HardPhone. It means that if you muted participant via Call Control API and Ringcentral Desktop app you need to unmute both endpoints to bring media back. </p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCallParty" class="collapse" aria-labelledby="updateCallParty">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#startCallRecording" aria-expanded="true" aria-controls="startCallRecording">Create Recording</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/startCallRecording">#</a></td>
      <td class="description"><p>Starts a new call recording for the party</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="startCallRecording" class="collapse" aria-labelledby="startCallRecording">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/recordings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#pauseResumeCallRecording" aria-expanded="true" aria-controls="pauseResumeCallRecording">Pause/Resume Recording</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/pauseResumeCallRecording">#</a></td>
      <td class="description"><p>Pause/resume recording</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="pauseResumeCallRecording" class="collapse" aria-labelledby="pauseResumeCallRecording">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/recordings/{recordingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">brandId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Identifies a brand of a logged in user or a brand of a sign-up session</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">recordingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a recording</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#superviseCallSession" aria-expanded="true" aria-controls="superviseCallSession">Supervise Call Session</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/superviseCallSession">#</a></td>
      <td class="description"><p>Allows to monitor a call session in 'Listen' mode. Input parameters should contain internal identifiers of a monitored user and a supervisor's device. Call session should be specified in path. Please note that this method supports single channel audio flow, which means that audio of both call participants is mixed and delivered to the supervisor in single audio channel.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="superviseCallSession" class="collapse" aria-labelledby="superviseCallSession">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/supervise</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#superviseCallParty" aria-expanded="true" aria-controls="superviseCallParty">Supervise Call Party</a> <a href="https://developers.ringcentral.com/api-reference/Call-Control/superviseCallParty">#</a></td>
      <td class="description"><p>Allows to monitor a call party in 'Listen' mode. Input parameters are extension number of a monitored user and internal identifier of a supervisor's device. Call session and party identifiers should be specified in path. Please note that for this method dual channel audio flow is supported, which means that you need to make one more request for monitoring the second participant of a call. And as a result of each monitoring request the client recieves SIP invite with the following header <code>p-rc-api-monitoring-ids</code> containing IDs of the monitored party and session. The flow is supported for calls with no more than 2 participants.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="superviseCallParty" class="collapse" aria-labelledby="superviseCallParty">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/telephony/sessions/{telephonySessionId}/parties/{partyId}/supervise</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">partyId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call party</td>
            </tr>
<tr>
	      <td class="n">telephonySessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Forwarding

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listForwardingNumbers" aria-expanded="true" aria-controls="listForwardingNumbers">Get Forwarding Number List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Forwarding/listForwardingNumbers">#</a></td>
      <td class="description"><p>Returns the list of extension phone numbers used for call forwarding and call flip. The returned list contains all the extension phone numbers used for call forwarding and call flip.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listForwardingNumbers" class="collapse" aria-labelledby="listForwardingNumbers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted.</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items).</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createForwardingNumber" aria-expanded="true" aria-controls="createForwardingNumber">Create Forwarding Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Forwarding/createForwardingNumber">#</a></td>
      <td class="description"><p>Adds a new forwarding number to the forwarding number list.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createForwardingNumber" class="collapse" aria-labelledby="createForwardingNumber">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readForwardingNumber" aria-expanded="true" aria-controls="readForwardingNumber">Get Forwarding Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Forwarding/readForwardingNumber">#</a></td>
      <td class="description"><p>Returns a specific forwarding number.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readForwardingNumber" class="collapse" aria-labelledby="readForwardingNumber">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">forwardingNumberId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateForwardingNumber" aria-expanded="true" aria-controls="updateForwardingNumber">Update Forwarding Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Forwarding/updateForwardingNumber">#</a></td>
      <td class="description"><p>Updates the existing forwarding number from the forwarding number list.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateForwardingNumber" class="collapse" aria-labelledby="updateForwardingNumber">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">forwardingNumberId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a forwarding number; returned in response in the 'id' field</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteForwardingNumber" aria-expanded="true" aria-controls="deleteForwardingNumber">Delete Forwarding Number</a> <a href="https://developers.ringcentral.com/api-reference/Call-Forwarding/deleteForwardingNumber">#</a></td>
      <td class="description"><p>Deletes a forwarding number from the forwarding number list by its ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteForwardingNumber" class="collapse" aria-labelledby="deleteForwardingNumber">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number/{forwardingNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">forwardingNumberId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a forwarding number</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Log

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserCallLog" aria-expanded="true" aria-controls="readUserCallLog">Get User Call Log Records</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/readUserCallLog">#</a></td>
      <td class="description"><p>Returns call log records filtered by parameters specified.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserCallLog" class="collapse" aria-labelledby="readUserCallLog">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours</td>
            </tr>
<tr>
	      <td class="n">dateTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The direction for the resulting records. If not specified, both inbound and outbound records are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Extension number of a user. If specified, returns call log for a particular extension only</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">phoneNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Phone number of a caller/callee. If specified, returns all calls (both incoming and outcoming) with the phone number specified</td>
            </tr>
<tr>
	      <td class="n">recordingType</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Type of a call recording. If not specified, then calls without recordings are also returned</td>
            </tr>
<tr>
	      <td class="n">sessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a session</td>
            </tr>
<tr>
	      <td class="n">showBlocked</td>
	      <td class="t">boolean</td>
	      <td class="d">True</td>
	      <td class="r">False</td>
	      <td class="de">If 'True' then calls from/to blocked numbers are returned</td>
            </tr>
<tr>
	      <td class="n">showDeleted</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">If 'True' then deleted calls are returned</td>
            </tr>
<tr>
	      <td class="n">transport</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Call transport type. 'PSTN' specifies that a call leg is initiated from the PSTN network provider; 'VoIP' - from an RC phone. By default this filter is disabled</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Call type of a record. It is allowed to specify more than one type. If not specified, all call types are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync</td>
            </tr>
<tr>
	      <td class="n">withRecording</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">**Deprecated**. Supported for compatibility reasons. `True` if only recorded calls are returned. If both `withRecording` and `recordingType` are specified, then `withRecording` is ignored</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteUserCallLog" aria-expanded="true" aria-controls="deleteUserCallLog">Delete User Call Log</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/deleteUserCallLog">#</a></td>
      <td class="description"><p>Deletes filtered call log records.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteUserCallLog" class="collapse" aria-labelledby="deleteUserCallLog">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">dateTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for records deletion in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">phoneNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#syncUserCallLog" aria-expanded="true" aria-controls="syncUserCallLog">Sync User Call Log</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/syncUserCallLog">#</a></td>
      <td class="description"><p>Synchronizes call log records</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="syncUserCallLog" class="collapse" aria-labelledby="syncUserCallLog">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log-sync</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601] format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is the current moment</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">For 'FSync' the parameter is mandatory, it limits the number of records to be returned in response. For 'ISync' it specifies with how many records to extend sync Frame to the past, the maximum number of records is 250</td>
            </tr>
<tr>
	      <td class="n">showDeleted</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">Supported for ISync. If 'True' then deleted call records are returned</td>
            </tr>
<tr>
	      <td class="n">statusGroup</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of calls to be returned. The default value is 'All'</td>
            </tr>
<tr>
	      <td class="n">syncToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Value of syncToken property of last sync request response</td>
            </tr>
<tr>
	      <td class="n">syncType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of synchronization</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserCallRecord" aria-expanded="true" aria-controls="readUserCallRecord">Get User Call Record</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/readUserCallRecord">#</a></td>
      <td class="description"><p>Returns call log records by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserCallRecord" class="collapse" aria-labelledby="readUserCallRecord">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-log/{callRecordId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">callRecordId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The view value specified for 'FSync' will also be applied for 'ISync' by default, since it cannot be changed for ISync</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listExtensionActiveCalls" aria-expanded="true" aria-controls="listExtensionActiveCalls">Get User Active Calls</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/listExtensionActiveCalls">#</a></td>
      <td class="description"><p>Returns records of all extension calls that are in progress, ordered by start time in descending order.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listExtensionActiveCalls" class="collapse" aria-labelledby="listExtensionActiveCalls">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/active-calls</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Call type of a record. If not specified, all call types are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCompanyCallLog" aria-expanded="true" aria-controls="readCompanyCallLog">Get Company Call Log Records</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/readCompanyCallLog">#</a></td>
      <td class="description"><p>Returns call log records filtered by parameters specified.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCompanyCallLog" class="collapse" aria-labelledby="readCompanyCallLog">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-log</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours</td>
            </tr>
<tr>
	      <td class="n">dateTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">extensionNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Extension number of a user. If specified, returns call log for a particular extension only</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">phoneNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Phone number of a caller/call recipient. If specified, returns all calls (both incoming and outcoming) with the phone number specified. Cannot be specified together with the extensionNumber filter</td>
            </tr>
<tr>
	      <td class="n">recordingType</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Type of a call recording. If not specified, then calls without recordings are also returned</td>
            </tr>
<tr>
	      <td class="n">sessionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a call session</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Call type of a record. If not specified, all call types are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync</td>
            </tr>
<tr>
	      <td class="n">withRecording</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">**Deprecated**. Supported for compatibility reasons only. `true` if only recorded calls are returned. The default value is `false`. If both `withRecording` and `recordingType` are specified, `withRecording` is ignored</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#syncAccountCallLog" aria-expanded="true" aria-controls="syncAccountCallLog">Sync Company Call Log</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/syncAccountCallLog">#</a></td>
      <td class="description"><p>Synchronizes company call log records.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="syncAccountCallLog" class="collapse" aria-labelledby="syncAccountCallLog">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-log-sync</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting records in (ISO 8601)[https://en.wikipedia.org/wiki/ISO_8601]  format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is the current moment</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">For 'FSync' the parameter is mandatory, it limits the number of records to be returned in response. For 'ISync' it specifies with how many records to extend sync frame to the past, the maximum number of records is 250</td>
            </tr>
<tr>
	      <td class="n">showDeleted</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">Supported for ISync. If 'True' then deleted call records are returned</td>
            </tr>
<tr>
	      <td class="n">statusGroup</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of calls to be returned.</td>
            </tr>
<tr>
	      <td class="n">syncToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Value of syncToken property of last sync request response</td>
            </tr>
<tr>
	      <td class="n">syncType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of synchronization. 'FSync' is a default value</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCompanyCallRecord" aria-expanded="true" aria-controls="readCompanyCallRecord">Get Company Call Log Record(s)</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/readCompanyCallRecord">#</a></td>
      <td class="description"><p>Returns individual call log record(s) by ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCompanyCallRecord" class="collapse" aria-labelledby="readCompanyCallRecord">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-log/{callRecordId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">callRecordId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call log record</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The view value specified for 'FSync' will also be applied for 'ISync' by default, since it cannot be changed for ISync</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCompanyActiveCalls" aria-expanded="true" aria-controls="listCompanyActiveCalls">Get Company Active Calls</a> <a href="https://developers.ringcentral.com/api-reference/Call-Log/listCompanyActiveCalls">#</a></td>
      <td class="description"><p>Returns records of all calls that are in progress, ordered by start time in descending order.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCompanyActiveCalls" class="collapse" aria-labelledby="listCompanyActiveCalls">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/active-calls</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The direction for the result records. If not specified, both inbound and outbound records are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">transport</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Call transport type. 'PSTN' specifies that a call leg is initiated from the PSTN network provider; 'VoIP' - from an RC phone. By default this filter is disabled</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Call type of a record. If not specified, all call types are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de">View of call records. The same view parameter specified for FSync will be applied for ISync, the view cannot be changed for ISync</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Monitoring Groups

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createCallMonitoringGroup" aria-expanded="true" aria-controls="createCallMonitoringGroup">Create Call Monitoring Group</a> <a href="https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/createCallMonitoringGroup">#</a></td>
      <td class="description"><p>Creates a new call monitoring group.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createCallMonitoringGroup" class="collapse" aria-labelledby="createCallMonitoringGroup">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Parameters of a call monitoring group that will be created</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallMonitoringGroups" aria-expanded="true" aria-controls="listCallMonitoringGroups">Get Call Monitoring Groups List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/listCallMonitoringGroups">#</a></td>
      <td class="description"><p>Returns call monitoring groups that can be filtered by some extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallMonitoringGroups" class="collapse" aria-labelledby="listCallMonitoringGroups">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">memberExtensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of an extension that is a member of every group within the result</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCallMonitoringGroup" aria-expanded="true" aria-controls="updateCallMonitoringGroup">Updates Call Monitoring Group</a> <a href="https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/updateCallMonitoringGroup">#</a></td>
      <td class="description"><p>Updates call monitoring group name by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCallMonitoringGroup" class="collapse" aria-labelledby="updateCallMonitoringGroup">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Parameters of a call monitoring group that will be updated</td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a call monitoring group</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCallMonitoringGroup" aria-expanded="true" aria-controls="deleteCallMonitoringGroup">Delete Call Monitoring Group</a> <a href="https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/deleteCallMonitoringGroup">#</a></td>
      <td class="description"><p>Remove infromation about the given call monitoring group.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCallMonitoringGroup" class="collapse" aria-labelledby="deleteCallMonitoringGroup">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallMonitoringGroupMembers" aria-expanded="true" aria-controls="listCallMonitoringGroupMembers">Get Call Monitoring Group Member List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/listCallMonitoringGroupMembers">#</a></td>
      <td class="description"><p>Returns call monitoring group members.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallMonitoringGroupMembers" class="collapse" aria-labelledby="listCallMonitoringGroupMembers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/members</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCallMonitoringGroupList" aria-expanded="true" aria-controls="updateCallMonitoringGroupList">Update Call Monitoring Group List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Monitoring-Groups/updateCallMonitoringGroupList">#</a></td>
      <td class="description"><p>Updates call monitoring groups.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCallMonitoringGroupList" class="collapse" aria-labelledby="updateCallMonitoringGroupList">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-monitoring-groups/{groupId}/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Changes for the given group</td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Queues

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallQueues" aria-expanded="true" aria-controls="listCallQueues">Get Call Queue List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Queues/listCallQueues">#</a></td>
      <td class="description"><p>Returns call queue group list.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallQueues" class="collapse" aria-labelledby="listCallQueues">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-queues</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">memberExtensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of an extension that is a member of every group within the result</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallQueueMembers" aria-expanded="true" aria-controls="listCallQueueMembers">Get Call Queue Members</a> <a href="https://developers.ringcentral.com/api-reference/Call-Queues/listCallQueueMembers">#</a></td>
      <td class="description"><p>Returns call queue group members.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallQueueMembers" class="collapse" aria-labelledby="listCallQueueMembers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-queues/{groupId}/members</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#assignMultipleCallQueueMembers" aria-expanded="true" aria-controls="assignMultipleCallQueueMembers">Assign Multiple Call Queue Members</a> <a href="https://developers.ringcentral.com/api-reference/Call-Queues/assignMultipleCallQueueMembers">#</a></td>
      <td class="description"><p>Updates a call queue group.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="assignMultipleCallQueueMembers" class="collapse" aria-labelledby="assignMultipleCallQueueMembers">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-queues/{groupId}/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Changes for the given group</td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateUserCallQueues" aria-expanded="true" aria-controls="updateUserCallQueues">Update User Call Queues</a> <a href="https://developers.ringcentral.com/api-reference/Call-Queues/updateUserCallQueues">#</a></td>
      <td class="description"><p>Updates the list of call queues where the user is an agent. This is a full update request, which means that if any queue where the user is an agent is not mentioned in request, then the user is automatically removed from this queue.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateUserCallQueues" class="collapse" aria-labelledby="updateUserCallQueues">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/call-queues</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listDepartmentMembers" aria-expanded="true" aria-controls="listDepartmentMembers">Get Department Member List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Queues/listDepartmentMembers">#</a></td>
      <td class="description"><p>Viewing user account info (including name, business name, address and phone number/account number)</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listDepartmentMembers" class="collapse" aria-labelledby="listDepartmentMembers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/department/{departmentId}/members</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">departmentId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a Department extension (same as extensionId but only the ID of a department extension is valid)</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#assignMultipleDepartmentMembers" aria-expanded="true" aria-controls="assignMultipleDepartmentMembers">Assign Multiple Department Members</a> <a href="https://developers.ringcentral.com/api-reference/Call-Queues/assignMultipleDepartmentMembers">#</a></td>
      <td class="description"><p>Adds and/or removes multiple call queue members</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="assignMultipleDepartmentMembers" class="collapse" aria-labelledby="assignMultipleDepartmentMembers">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/department/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Recordings

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCallRecording" aria-expanded="true" aria-controls="readCallRecording">Get Call Recording</a> <a href="https://developers.ringcentral.com/api-reference/Call-Recordings/readCallRecording">#</a></td>
      <td class="description"><p>Returns call recordings by ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCallRecording" class="collapse" aria-labelledby="readCallRecording">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/recording/{recordingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">recordingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a recording (returned in Call Log)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallRecordingData" aria-expanded="true" aria-controls="listCallRecordingData">Get Call Recordings Data</a> <a href="https://developers.ringcentral.com/api-reference/Call-Recordings/listCallRecordingData">#</a></td>
      <td class="description"><p>Returns media content of a call recording.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallRecordingData" class="collapse" aria-labelledby="listCallRecordingData">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/recording/{recordingId}/content</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">recordingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a recording (returned in Call Log)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Call Routing

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createIVRPrompt" aria-expanded="true" aria-controls="createIVRPrompt">Create IVR Prompts</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/createIVRPrompt">#</a></td>
      <td class="description"><p>Creates an IVR prompt.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createIVRPrompt" class="collapse" aria-labelledby="createIVRPrompt">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">attachment</td>
	      <td class="t">file</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Audio file that will be used as a prompt. Attachment cannot be empty, only audio files are supported</td>
            </tr>
<tr>
	      <td class="n">name</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Description of file contents.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listIVRPrompts" aria-expanded="true" aria-controls="listIVRPrompts">Get IVR Prompt List</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/listIVRPrompts">#</a></td>
      <td class="description"><p>Returns the list of IVR prompts.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listIVRPrompts" class="collapse" aria-labelledby="listIVRPrompts">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readIVRPrompt" aria-expanded="true" aria-controls="readIVRPrompt">Get IVR Prompt</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/readIVRPrompt">#</a></td>
      <td class="description"><p>Returns an IVR prompt by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readIVRPrompt" class="collapse" aria-labelledby="readIVRPrompt">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">promptId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteIVRPrompt" aria-expanded="true" aria-controls="deleteIVRPrompt">Delete IVR Prompt</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/deleteIVRPrompt">#</a></td>
      <td class="description"><p>Deletes an IVR prompt by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteIVRPrompt" class="collapse" aria-labelledby="deleteIVRPrompt">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">promptId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateIVRPrompt" aria-expanded="true" aria-controls="updateIVRPrompt">Update IVR Prompt</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/updateIVRPrompt">#</a></td>
      <td class="description"><p>Updates an IVR prompt by ID</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateIVRPrompt" class="collapse" aria-labelledby="updateIVRPrompt">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">promptId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readIVRPromptContent" aria-expanded="true" aria-controls="readIVRPromptContent">Get IVR Prompt Content</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/readIVRPromptContent">#</a></td>
      <td class="description"><p>Returns media content of an IVR prompt by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readIVRPromptContent" class="collapse" aria-labelledby="readIVRPromptContent">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-prompts/{promptId}/content</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">promptId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createIVRMenu" aria-expanded="true" aria-controls="createIVRMenu">Create IVR Menu</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/createIVRMenu">#</a></td>
      <td class="description"><p>Creates a company IVR menu.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createIVRMenu" class="collapse" aria-labelledby="createIVRMenu">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-menus</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readIVRMenu" aria-expanded="true" aria-controls="readIVRMenu">Get IVR Menu</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/readIVRMenu">#</a></td>
      <td class="description"><p>Returns a company IVR menu by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readIVRMenu" class="collapse" aria-labelledby="readIVRMenu">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-menus/{ivrMenuId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">ivrMenuId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateIVRMenu" aria-expanded="true" aria-controls="updateIVRMenu">Update IVR Menu</a> <a href="https://developers.ringcentral.com/api-reference/Call-Routing/updateIVRMenu">#</a></td>
      <td class="description"><p>Updates a company IVR menu by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateIVRMenu" class="collapse" aria-labelledby="updateIVRMenu">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/ivr-menus/{ivrMenuId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">ivrMenuId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Chats

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipChats" aria-expanded="true" aria-controls="listGlipChats">Get Chats</a> <a href="https://developers.ringcentral.com/api-reference/Chats/listGlipChats">#</a></td>
      <td class="description"><p>Returns the list of chats where the user is a member and also public teams that can be joined. All records in response are sorted by creation time of a chat in ascending order.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipChats" class="collapse" aria-labelledby="listGlipChats">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/chats</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token.</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of chats to be fetched by one request. The maximum value is 250, by default - 30.</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of chats to be fetched. By default all type of chats will be fetched</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipChat" aria-expanded="true" aria-controls="readGlipChat">Get Chat</a> <a href="https://developers.ringcentral.com/api-reference/Chats/readGlipChat">#</a></td>
      <td class="description"><p>Returns information about a chat by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipChat" class="collapse" aria-labelledby="readGlipChat">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listRecentChats" aria-expanded="true" aria-controls="listRecentChats">Get Recent Chats</a> <a href="https://developers.ringcentral.com/api-reference/Chats/listRecentChats">#</a></td>
      <td class="description"><p>Returns recent chats where the user is a member. All records in response are sorted by the <code>lastModifiedTime</code> in descending order (the latest changed chat is displayed first on page)</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listRecentChats" class="collapse" aria-labelledby="listRecentChats">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/recent/chats</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Max number of chats to be fetched by one request (Not more than 250).</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of chats to be fetched. By default all chat types are returned</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listFavoriteChats" aria-expanded="true" aria-controls="listFavoriteChats">Get Favorite Chats</a> <a href="https://developers.ringcentral.com/api-reference/Chats/listFavoriteChats">#</a></td>
      <td class="description"><p>Returns a list of the current user's favorite chats.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listFavoriteChats" class="collapse" aria-labelledby="listFavoriteChats">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/favorites</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#favoriteGlipChat" aria-expanded="true" aria-controls="favoriteGlipChat">Add Chat to Favorites</a> <a href="https://developers.ringcentral.com/api-reference/Chats/favoriteGlipChat">#</a></td>
      <td class="description"><p>Adds the specified chat to the users's list of favorites.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="favoriteGlipChat" class="collapse" aria-labelledby="favoriteGlipChat">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/favorite</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#unfavoriteGlipChat" aria-expanded="true" aria-controls="unfavoriteGlipChat">Remove Chat from Favorites</a> <a href="https://developers.ringcentral.com/api-reference/Chats/unfavoriteGlipChat">#</a></td>
      <td class="description"><p>Removes the specified chat from the users's list of favorites.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="unfavoriteGlipChat" class="collapse" aria-labelledby="unfavoriteGlipChat">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/unfavorite</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#markChatRead" aria-expanded="true" aria-controls="markChatRead">Mark Chat as Read</a> <a href="https://developers.ringcentral.com/api-reference/Chats/markChatRead">#</a></td>
      <td class="description"><p>Sets the specified chat status to 'Read' for the current user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="markChatRead" class="collapse" aria-labelledby="markChatRead">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/read</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#markChatUnread" aria-expanded="true" aria-controls="markChatUnread">Mark Chat as Unread</a> <a href="https://developers.ringcentral.com/api-reference/Chats/markChatUnread">#</a></td>
      <td class="description"><p>Sets the specified chat status to 'Unread' for the current user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="markChatUnread" class="collapse" aria-labelledby="markChatUnread">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/unread</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipGroups" aria-expanded="true" aria-controls="listGlipGroups">Get User Groups</a> <a href="https://developers.ringcentral.com/api-reference/Chats/listGlipGroups">#</a></td>
      <td class="description"><p>Returns the list of groups where the user is a member.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipGroups" class="collapse" aria-labelledby="listGlipGroups">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/groups</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token.</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of groups to be fetched by one request. The maximum value is 250, by default - 30</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of groups to be fetched (by default all type of groups will be fetched)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipGroup" aria-expanded="true" aria-controls="createGlipGroup">Create Group</a> <a href="https://developers.ringcentral.com/api-reference/Chats/createGlipGroup">#</a></td>
      <td class="description"><p>Creates a new private chat/team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipGroup" class="collapse" aria-labelledby="createGlipGroup">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/groups</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipGroup" aria-expanded="true" aria-controls="readGlipGroup">Get Group</a> <a href="https://developers.ringcentral.com/api-reference/Chats/readGlipGroup">#</a></td>
      <td class="description"><p>Returns information about a group or multiple groups by their ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipGroup" class="collapse" aria-labelledby="readGlipGroup">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#assignGlipGroupMembers" aria-expanded="true" aria-controls="assignGlipGroupMembers">Edit Group Members</a> <a href="https://developers.ringcentral.com/api-reference/Chats/assignGlipGroupMembers">#</a></td>
      <td class="description"><p>Updates group members. <strong>Please note:</strong> Only groups of 'Team' type can be updated. Currently only one operation at a time (either adding or removal) is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="assignGlipGroupMembers" class="collapse" aria-labelledby="assignGlipGroupMembers">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a group</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Company

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAccountInfo" aria-expanded="true" aria-controls="readAccountInfo">Get Account Info</a> <a href="https://developers.ringcentral.com/api-reference/Company/readAccountInfo">#</a></td>
      <td class="description"><p>Returns basic information about a particular RingCentral customer account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAccountInfo" class="collapse" aria-labelledby="readAccountInfo">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAccountBusinessAddress" aria-expanded="true" aria-controls="readAccountBusinessAddress">Get Account Business Address</a> <a href="https://developers.ringcentral.com/api-reference/Company/readAccountBusinessAddress">#</a></td>
      <td class="description"><p>Returns business address of a company.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAccountBusinessAddress" class="collapse" aria-labelledby="readAccountBusinessAddress">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-address</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateAccountBusinessAddress" aria-expanded="true" aria-controls="updateAccountBusinessAddress">Update Company Business Address</a> <a href="https://developers.ringcentral.com/api-reference/Company/updateAccountBusinessAddress">#</a></td>
      <td class="description"><p>Updates the business address of a company that account is linked to. Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateAccountBusinessAddress" class="collapse" aria-labelledby="updateAccountBusinessAddress">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/business-address</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAccountServiceInfo" aria-expanded="true" aria-controls="readAccountServiceInfo">Get Account Service Info</a> <a href="https://developers.ringcentral.com/api-reference/Company/readAccountServiceInfo">#</a></td>
      <td class="description"><p>Returns the information about service plan, available features and limitations for a particular RingCentral customer account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAccountServiceInfo" class="collapse" aria-labelledby="readAccountServiceInfo">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/service-info</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Conversations

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipConversations" aria-expanded="true" aria-controls="listGlipConversations">Get Conversations</a> <a href="https://developers.ringcentral.com/api-reference/Conversations/listGlipConversations">#</a></td>
      <td class="description"><p>Returns the list of conversations where the user is a member. All records in response are sorted by creation time of a chat in ascending order.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipConversations" class="collapse" aria-labelledby="listGlipConversations">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/conversations</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token.</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of conversations to be fetched by one request. The maximum value is 250, by default - 30</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipConversation" aria-expanded="true" aria-controls="createGlipConversation">Create/Open Conversation</a> <a href="https://developers.ringcentral.com/api-reference/Conversations/createGlipConversation">#</a></td>
      <td class="description"><p>Creates a new conversation or opens the existing one. If the conversation already exists, then its ID will be returned in response. A conversation is an adhoc discussion between a particular set of users, not featuring any specific name or description. If you add a person to the existing conversation, it creates a whole new conversation.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipConversation" class="collapse" aria-labelledby="createGlipConversation">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/conversations</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipConversation" aria-expanded="true" aria-controls="readGlipConversation">Get Conversation</a> <a href="https://developers.ringcentral.com/api-reference/Conversations/readGlipConversation">#</a></td>
      <td class="description"><p>Returns information about the specified conversation, including the list of conversation participants. A conversation is an adhoc discussion between a particular set of users, not featuring any specific name or description. If you add a person to the existing conversation, it creates a whole new conversation.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipConversation" class="collapse" aria-labelledby="readGlipConversation">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/conversations/{chatId}</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Custom Fields

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createCustomField" aria-expanded="true" aria-controls="createCustomField">Create Custom Field</a> <a href="https://developers.ringcentral.com/api-reference/Custom-Fields/createCustomField">#</a></td>
      <td class="description"><p>Creates custom field attached to the object.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createCustomField" class="collapse" aria-labelledby="createCustomField">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCustomFields" aria-expanded="true" aria-controls="listCustomFields">Get Custom Field List</a> <a href="https://developers.ringcentral.com/api-reference/Custom-Fields/listCustomFields">#</a></td>
      <td class="description"><p>Returns the list of created custom fields.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCustomFields" class="collapse" aria-labelledby="listCustomFields">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCustomField" aria-expanded="true" aria-controls="updateCustomField">Update Сustom Field</a> <a href="https://developers.ringcentral.com/api-reference/Custom-Fields/updateCustomField">#</a></td>
      <td class="description"><p>Updates custom field by ID specified in path.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCustomField" class="collapse" aria-labelledby="updateCustomField">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields/{fieldId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">fieldId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Custom field identifier</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCustomField" aria-expanded="true" aria-controls="deleteCustomField">Delete Custom Field</a> <a href="https://developers.ringcentral.com/api-reference/Custom-Fields/deleteCustomField">#</a></td>
      <td class="description"><p>Deletes custom field(s) by ID(s) with the corresponding values.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCustomField" class="collapse" aria-labelledby="deleteCustomField">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/custom-fields/{fieldId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">fieldId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Custom field identifier</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Devices

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readDevice" aria-expanded="true" aria-controls="readDevice">Get Device</a> <a href="https://developers.ringcentral.com/api-reference/Devices/readDevice">#</a></td>
      <td class="description"><p>Returns account device(s) by their ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readDevice" class="collapse" aria-labelledby="readDevice">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/device/{deviceId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">deviceId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a device</td>
            </tr>
<tr>
	      <td class="n">syncEmergencyAddress</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">false</td>
	      <td class="de">Specifies if emergency address should be synchronized or not</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateDevice" aria-expanded="true" aria-controls="updateDevice">Update Device</a> <a href="https://developers.ringcentral.com/api-reference/Devices/updateDevice">#</a></td>
      <td class="description"><p>Updates account device(s) by their ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateDevice" class="collapse" aria-labelledby="updateDevice">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/device/{deviceId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">deviceId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">prestatement</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listExtensionDevices" aria-expanded="true" aria-controls="listExtensionDevices">Get Extension Device List</a> <a href="https://developers.ringcentral.com/api-reference/Devices/listExtensionDevices">#</a></td>
      <td class="description"><p>Returns devices of the extension(s) by their ID(s). Batch request is supported</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listExtensionDevices" class="collapse" aria-labelledby="listExtensionDevices">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/device</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">feature</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Device feature or multiple features supported</td>
            </tr>
<tr>
	      <td class="n">linePooling</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pooling type of a device</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Extensions

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listExtensions" aria-expanded="true" aria-controls="listExtensions">Get Extension List</a> <a href="https://developers.ringcentral.com/api-reference/Extensions/listExtensions">#</a></td>
      <td class="description"><p>Returns the list of extensions created for a particular account. All types of extensions are included in this list.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listExtensions" class="collapse" aria-labelledby="listExtensions">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">email</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Extension email address</td>
            </tr>
<tr>
	      <td class="n">extensionNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Number of extension to be retrieved</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Extension current state. Multiple values are supported. If 'Unassigned' is specified, then extensions without `extensionNumber` attribute are returned. If not specified, then all extensions are returned.</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Extension type. Multiple values are supported</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createExtension" aria-expanded="true" aria-controls="createExtension">Create Extension</a> <a href="https://developers.ringcentral.com/api-reference/Extensions/createExtension">#</a></td>
      <td class="description"><p>Creates an extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createExtension" class="collapse" aria-labelledby="createExtension">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listUserTemplates" aria-expanded="true" aria-controls="listUserTemplates">Get User Template List</a> <a href="https://developers.ringcentral.com/api-reference/Extensions/listUserTemplates">#</a></td>
      <td class="description"><p>Returns the list of user templates for the current account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listUserTemplates" class="collapse" aria-labelledby="listUserTemplates">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/templates</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserTemplate" aria-expanded="true" aria-controls="readUserTemplate">Get User Template</a> <a href="https://developers.ringcentral.com/api-reference/Extensions/readUserTemplate">#</a></td>
      <td class="description"><p>Returns the user template by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserTemplate" class="collapse" aria-labelledby="readUserTemplate">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/templates/{templateId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">templateId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### External Contacts

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listContacts" aria-expanded="true" aria-controls="listContacts">Get Contact List</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/listContacts">#</a></td>
      <td class="description"><p>Returns user personal contacts.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listContacts" class="collapse" aria-labelledby="listContacts">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">phoneNumber</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">sortBy</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Sorts results by the specified property</td>
            </tr>
<tr>
	      <td class="n">startsWith</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">If specified, only contacts whose First name or Last name start with the mentioned substring are returned. Case-insensitive</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createContact" aria-expanded="true" aria-controls="createContact">Create Contact</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/createContact">#</a></td>
      <td class="description"><p>Creates personal user contact.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createContact" class="collapse" aria-labelledby="createContact">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">dialingPlan</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">A country code value complying with the [ISO 3166-1 alpha-2](https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. The default value is home country of the current extension</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readContact" aria-expanded="true" aria-controls="readContact">Get Contact</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/readContact">#</a></td>
      <td class="description"><p>Returns contact(s) by ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readContact" class="collapse" aria-labelledby="readContact">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact/{contactId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">contactId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a contact record in the RingCentral database</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateContact" aria-expanded="true" aria-controls="updateContact">Update Contact</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/updateContact">#</a></td>
      <td class="description"><p>Updates personal contact information by contact ID(s). Batch request is supported</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateContact" class="collapse" aria-labelledby="updateContact">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact/{contactId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">contactId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a contact record in the RingCentral database</td>
            </tr>
<tr>
	      <td class="n">dialingPlan</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">A country code value complying with the [ISO 3166-1 alpha-2](https://ru.wikipedia.org/wiki/ISO_3166-1_alpha-2) format. The default value is home country of the current extension</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteContact" aria-expanded="true" aria-controls="deleteContact">Delete Contact</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/deleteContact">#</a></td>
      <td class="description"><p>Deletes contact(s) by ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteContact" class="collapse" aria-labelledby="deleteContact">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book/contact/{contactId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">contactId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a contact record in the RingCentral database</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#syncAddressBook" aria-expanded="true" aria-controls="syncAddressBook">Address Book Synchronization</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/syncAddressBook">#</a></td>
      <td class="description"><p>Synchronizes user contacts.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="syncAddressBook" class="collapse" aria-labelledby="syncAddressBook">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/address-book-sync</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">pageId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a page. It can be obtained from the 'nextPageId' parameter passed in response body</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Number of records per page to be returned. The max number of records is 250, which is also the default. For 'FSync' if the number of records exceeds the parameter value (either specified or default), all of the pages can be retrieved in several requests. For 'ISync' if the number of records exceeds the page size, the number of incoming changes to this number is limited</td>
            </tr>
<tr>
	      <td class="n">syncToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Value of syncToken property of the last sync request response</td>
            </tr>
<tr>
	      <td class="n">syncType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of synchronization</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listFavoriteContacts" aria-expanded="true" aria-controls="listFavoriteContacts">Get Favorite Contact List</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/listFavoriteContacts">#</a></td>
      <td class="description"><p>Returns the list of favorite contacts of the current extension. Favorite contacts include both company contacts (extensions) and personal contacts (address book records).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listFavoriteContacts" class="collapse" aria-labelledby="listFavoriteContacts">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateFavoriteContactList" aria-expanded="true" aria-controls="updateFavoriteContactList">Update Favorite Contact List</a> <a href="https://developers.ringcentral.com/api-reference/External-Contacts/updateFavoriteContactList">#</a></td>
      <td class="description"><p>Updates the list of favorite contacts of the current extension. Favorite contacts include both company contacts (extensions) and personal contacts (address book records).<strong>Please note</strong>: currently personal address book size is limited to 10 000 contacts.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateFavoriteContactList" class="collapse" aria-labelledby="updateFavoriteContactList">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Fax

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createFaxMessage" aria-expanded="true" aria-controls="createFaxMessage">Create Fax Message</a> <a href="https://developers.ringcentral.com/api-reference/Fax/createFaxMessage">#</a></td>
      <td class="description"><p>Creates and sends/resends a fax message. Resend can be implemented if sending has failed. Fax attachment size (both single and total) is limited to 50Mb.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createFaxMessage" class="collapse" aria-labelledby="createFaxMessage">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/fax</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account (integer) or tilde (~) to indicate the account which was logged-in within the current session.</td>
            </tr>
<tr>
	      <td class="n">attachment</td>
	      <td class="t">file</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">File to upload</td>
            </tr>
<tr>
	      <td class="n">coverIndex</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Cover page identifier. For the list of available cover page identifiers please call the method Fax Cover Pages. If not specified, the default cover page which is configured in 'Outbound Fax Settings' is attached</td>
            </tr>
<tr>
	      <td class="n">coverPageText</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Cover page text, entered by the fax sender and printed on the cover page. Maximum length is limited to 1024 symbols</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension (integer) or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">faxResolution</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Resolution of Fax</td>
            </tr>
<tr>
	      <td class="n">isoCode</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">ISO Code. e.g UK</td>
            </tr>
<tr>
	      <td class="n">sendTime</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Timestamp to send fax at. If not specified (current or the past), the fax is sent immediately</td>
            </tr>
<tr>
	      <td class="n">to</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">To Phone Number</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listFaxCoverPages" aria-expanded="true" aria-controls="listFaxCoverPages">Get Fax Cover Page List</a> <a href="https://developers.ringcentral.com/api-reference/Fax/listFaxCoverPages">#</a></td>
      <td class="description"><p>Returns fax cover pages available for the current extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listFaxCoverPages" class="collapse" aria-labelledby="listFaxCoverPages">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/fax-cover-page</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Features

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserFeatures" aria-expanded="true" aria-controls="readUserFeatures">Get User Features</a> <a href="https://developers.ringcentral.com/api-reference/Features/readUserFeatures">#</a></td>
      <td class="description"><p>Returns the list of supported features and information on their availability for the current extension. Specific feature(s) might be checked by providing <code>featureId</code> query param. Multiple values supported, format: <code>?featureId=Feature1&amp;featureId=Feature2</code>. To get only available features in order to decrease response size, <code>availableOnly=true</code> query param might be specified.
In case the feature is available for the current user, <code>"available": true</code> is returned in the response for the record with corresponding feature <code>id</code>. Otherwise, additional attribute <code>reason</code> is returned with the appropriate code:
* <code>ServicePlanLimitation</code> - the feature not included to the account service plan;
* <code>AccountLimitation</code> - the feature is turned off for the account;
* <code>ExtensionTypeLimitation</code> - the feature is not applicable for the extension type;
* <code>ExtensionLimitation</code> - the feature is not available for the extension, e.g., additional license required;
* <code>InsufficientPermissions</code> - required permission not granted to the current user (not the one, who is specified in the URL, but the one who's access token is used);
* <code>ConfigurationLimitation</code> - the feature is turned off for the extension, e.g., by the account administrator.</p>
<p>Also, some feature may have some additional parameters, e.g., limits, which are returned in <code>params</code> attribute as a name-value collection:</p>
<pre><code>{
  "id": "HUD",
  "available": true,
  "params": [
    {
      "name": "limitMax",
      "value": "100"
    }
  ]
}
</code></pre></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserFeatures" class="collapse" aria-labelledby="readUserFeatures">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/features</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">availableOnly</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">featureId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Glip Compliance Exports

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createDataExportTask" aria-expanded="true" aria-controls="createDataExportTask">Create Data Export Task</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/createDataExportTask">#</a></td>
      <td class="description"><p>Creates a task for Glip data export and returns a link at which the exported data will be available in future once the task is implemented. The exported data can be downloaded by calling Get Data Export Task method with the specified task ID. Simultaneously no more than 2 tasks per company can be created.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createDataExportTask" class="collapse" aria-labelledby="createDataExportTask">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/data-export</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listDataExportTasks" aria-expanded="true" aria-controls="listDataExportTasks">Get Data Export Task List</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/listDataExportTasks">#</a></td>
      <td class="description"><p>Returns the list of Glip data export tasks.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listDataExportTasks" class="collapse" aria-labelledby="listDataExportTasks">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/data-export</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">false</td>
	      <td class="de">Page number to be retrieved; value range is > 0</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">false</td>
	      <td class="de">Number of records to be returned per page; value range is 1 - 250</td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Status of the task(s) to be returned. Multiple values are supported</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readDataExportTask" aria-expanded="true" aria-controls="readDataExportTask">Get Data Export Task</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/readDataExportTask">#</a></td>
      <td class="description"><p>Returns the links for downloading Glip data exported within the specified task. If the export task is still in progress, then only the task status will be returned. If the data is ready for downloading, then the list of URLs will be returned.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readDataExportTask" class="collapse" aria-labelledby="readDataExportTask">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/data-export/{taskId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readDataExportTaskDataset" aria-expanded="true" aria-controls="readDataExportTaskDataset">Get Data Export Task Dataset</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Compliance-Exports/readDataExportTaskDataset">#</a></td>
      <td class="description"><p>Returns the specified dataset by ID. Each dataset is a ZIP archive the size of which is limited to 1 Gb.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readDataExportTaskDataset" class="collapse" aria-labelledby="readDataExportTaskDataset">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/data-export/{taskId}/datasets/{datasetId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">datasetId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a dataset</td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a task</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Glip Profile

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipPerson" aria-expanded="true" aria-controls="readGlipPerson">Get Person</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Profile/readGlipPerson">#</a></td>
      <td class="description"><p>Returns a user or multiple users by their ID(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipPerson" class="collapse" aria-labelledby="readGlipPerson">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/persons/{personId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipCompany" aria-expanded="true" aria-controls="readGlipCompany">Get Company Info</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Profile/readGlipCompany">#</a></td>
      <td class="description"><p>Returns information about one or more companies by their IDs.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipCompany" class="collapse" aria-labelledby="readGlipCompany">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/companies/{companyId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipPreferences" aria-expanded="true" aria-controls="readGlipPreferences">Get Preferences</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Profile/readGlipPreferences">#</a></td>
      <td class="description"><p>Returns information about user preferences.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipPreferences" class="collapse" aria-labelledby="readGlipPreferences">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/preferences</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Glip Webhooks

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipGroupWebhook" aria-expanded="true" aria-controls="createGlipGroupWebhook">Create Webhook in Group</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/createGlipGroupWebhook">#</a></td>
      <td class="description"><p>Creates a new webhook</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipGroupWebhook" class="collapse" aria-labelledby="createGlipGroupWebhook">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/webhooks</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipGroupWebhooks" aria-expanded="true" aria-controls="listGlipGroupWebhooks">Get Webhooks in Group</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/listGlipGroupWebhooks">#</a></td>
      <td class="description"><p>Returns webhooks which are available for the current user by group ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipGroupWebhooks" class="collapse" aria-labelledby="listGlipGroupWebhooks">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/webhooks</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipWebhooks" aria-expanded="true" aria-controls="listGlipWebhooks">Get Webhooks</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/listGlipWebhooks">#</a></td>
      <td class="description"><p>Returns a list of all webhooks associated with the current account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipWebhooks" class="collapse" aria-labelledby="listGlipWebhooks">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/webhooks</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipWebhook" aria-expanded="true" aria-controls="readGlipWebhook">Get Webhook</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/readGlipWebhook">#</a></td>
      <td class="description"><p>Returns webhooks(s) with the specified id(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipWebhook" class="collapse" aria-labelledby="readGlipWebhook">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteGlipWebhook" aria-expanded="true" aria-controls="deleteGlipWebhook">Delete Webhook</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/deleteGlipWebhook">#</a></td>
      <td class="description"><p>Deletes the webhook by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteGlipWebhook" class="collapse" aria-labelledby="deleteGlipWebhook">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#activateGlipWebhook" aria-expanded="true" aria-controls="activateGlipWebhook">Activate Webhook</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/activateGlipWebhook">#</a></td>
      <td class="description"><p>Activates webhook by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="activateGlipWebhook" class="collapse" aria-labelledby="activateGlipWebhook">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}/activate</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#suspendGlipWebhook" aria-expanded="true" aria-controls="suspendGlipWebhook">Suspend Webhook</a> <a href="https://developers.ringcentral.com/api-reference/Glip-Webhooks/suspendGlipWebhook">#</a></td>
      <td class="description"><p>Suspends webhook by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="suspendGlipWebhook" class="collapse" aria-labelledby="suspendGlipWebhook">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/webhooks/{webhookId}/suspend</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Internal Contacts

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#searchDirectoryEntries" aria-expanded="true" aria-controls="searchDirectoryEntries">Search Company Directory Entries</a> <a href="https://developers.ringcentral.com/api-reference/Internal-Contacts/searchDirectoryEntries">#</a></td>
      <td class="description"><p>Returns contact information on corporate users of federated accounts according to the specified filtering and ordering.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="searchDirectoryEntries" class="collapse" aria-labelledby="searchDirectoryEntries">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/entries/search</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readDirectoryEntry" aria-expanded="true" aria-controls="readDirectoryEntry">Get Corporate Directory Entry</a> <a href="https://developers.ringcentral.com/api-reference/Internal-Contacts/readDirectoryEntry">#</a></td>
      <td class="description"><p>Returns contact information on a particular corporate user of a federated account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readDirectoryEntry" class="collapse" aria-labelledby="readDirectoryEntry">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/entries/{entryId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of owning account</td>
            </tr>
<tr>
	      <td class="n">entryId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of extension to read information for</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listDirectoryEntries" aria-expanded="true" aria-controls="listDirectoryEntries">Get Company Directory Entries</a> <a href="https://developers.ringcentral.com/api-reference/Internal-Contacts/listDirectoryEntries">#</a></td>
      <td class="description"><p>Returns contact information on corporate users of federated accounts. Please note: 1. <code>User</code>, <code>DigitalUser</code>, <code>VirtualUser</code> and <code>FaxUser</code> types are returned as <code>User</code> type. 2. <code>ApplicationExtension</code> type is not returned. 3. Only extensions in <code>Enabled</code>, <code>Disabled</code> and <code>NotActivated</code> state are returned.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listDirectoryEntries" class="collapse" aria-labelledby="listDirectoryEntries">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/entries</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">If-None-Match</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">If-None-Match</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">string</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Page number</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">1000</td>
	      <td class="r">False</td>
	      <td class="de">Records count to be returned per one page. The default value is 1000. Specific keyword values: `all` - all records are returned in one page; `max` - maximum count of records that can be returned in one page</td>
            </tr>
<tr>
	      <td class="n">showFederated</td>
	      <td class="t">boolean</td>
	      <td class="d">True</td>
	      <td class="r">False</td>
	      <td class="de">If 'True' then contacts of all accounts in federation are returned. If 'False' then only contacts of the current account are returned, and account section is eliminated in this case</td>
            </tr>
<tr>
	      <td class="n">siteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of the business site to which extensions belong</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of an extension</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAccountFederation" aria-expanded="true" aria-controls="readAccountFederation">Get Account Federation</a> <a href="https://developers.ringcentral.com/api-reference/Internal-Contacts/readAccountFederation">#</a></td>
      <td class="description"><p>Returns information on a federation and associated accounts.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAccountFederation" class="collapse" aria-labelledby="readAccountFederation">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/directory/federation</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">RCExtensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">RCExtensionId</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Meeting Configuration

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMeetingServiceInfo" aria-expanded="true" aria-controls="readMeetingServiceInfo">Get Meeting Service Info</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Configuration/readMeetingServiceInfo">#</a></td>
      <td class="description"><p>Returns information on dial-in numbers for meetings, support and international dial-in numbers URIs and meeting account information.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMeetingServiceInfo" class="collapse" aria-labelledby="readMeetingServiceInfo">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/service-info</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateMeetingServiceInfo" aria-expanded="true" aria-controls="updateMeetingServiceInfo">Update Meeting Service Info</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Configuration/updateMeetingServiceInfo">#</a></td>
      <td class="description"><p>Updates personal meeting identifier.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateMeetingServiceInfo" class="collapse" aria-labelledby="updateMeetingServiceInfo">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/service-info</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAssistants" aria-expanded="true" aria-controls="readAssistants">Get Assistants</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Configuration/readAssistants">#</a></td>
      <td class="description"><p>Returns assistants information.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAssistants" class="collapse" aria-labelledby="readAssistants">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meetings-configuration/assistants</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAssistedUsers" aria-expanded="true" aria-controls="readAssistedUsers">Get Assisted Users</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Configuration/readAssistedUsers">#</a></td>
      <td class="description"><p>Returns assisted users information.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAssistedUsers" class="collapse" aria-labelledby="readAssistedUsers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meetings-configuration/assisted</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Meeting Management

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listMeetings" aria-expanded="true" aria-controls="listMeetings">Get Scheduled Meetings</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/listMeetings">#</a></td>
      <td class="description"><p>Returns a list of meetings for a particular extension. The list of meetings does not include meetings of 'Instant' type.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listMeetings" class="collapse" aria-labelledby="listMeetings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createMeeting" aria-expanded="true" aria-controls="createMeeting">Create Meeting</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/createMeeting">#</a></td>
      <td class="description"><p>Creates a new meeting.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createMeeting" class="collapse" aria-labelledby="createMeeting">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#GetUserSetting" aria-expanded="true" aria-controls="GetUserSetting">Get Meeting User Settings</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/GetUserSetting">#</a></td>
      <td class="description"><p>Returns user settings for meetings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="GetUserSetting" class="collapse" aria-labelledby="GetUserSetting">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/user-settings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMeeting" aria-expanded="true" aria-controls="readMeeting">Get Meeting Info</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/readMeeting">#</a></td>
      <td class="description"><p>Returns a particular meetings details by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMeeting" class="collapse" aria-labelledby="readMeeting">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">meetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral meeting</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateMeeting" aria-expanded="true" aria-controls="updateMeeting">Update Meeting</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/updateMeeting">#</a></td>
      <td class="description"><p>Modifies a particular meeting.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateMeeting" class="collapse" aria-labelledby="updateMeeting">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">meetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral meeting</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteMeeting" aria-expanded="true" aria-controls="deleteMeeting">Delete Meeting</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/deleteMeeting">#</a></td>
      <td class="description"><p>Deletes a scheduled meeting.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteMeeting" class="collapse" aria-labelledby="deleteMeeting">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">meetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral meeting</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#endMeeting" aria-expanded="true" aria-controls="endMeeting">End Meeting</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Management/endMeeting">#</a></td>
      <td class="description"><p>Ends a meetings which is in progress.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="endMeeting" class="collapse" aria-labelledby="endMeeting">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting/{meetingId}/end</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">meetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral meeting</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Meeting Recordings

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listAccountMeetingRecordings" aria-expanded="true" aria-controls="listAccountMeetingRecordings">Get Account Meeting Recordings List</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Recordings/listAccountMeetingRecordings">#</a></td>
      <td class="description"><p>Returns the list of meeting recordings for the current account.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listAccountMeetingRecordings" class="collapse" aria-labelledby="listAccountMeetingRecordings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/meeting-recordings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">meetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a meeting. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified</td>
            </tr>
<tr>
	      <td class="n">meetingStartTimeFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Recordings of meetings started after the time specified will be returned. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified</td>
            </tr>
<tr>
	      <td class="n">meetingStartTimeTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Recordings of meetings started before the time specified will be returned. The default value is current time. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Page number</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Number of items per page. The `max` value is supported to indicate the maximum size - 300</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listUserMeetingRecordings" aria-expanded="true" aria-controls="listUserMeetingRecordings">Get User Meeting Recordings List</a> <a href="https://developers.ringcentral.com/api-reference/Meeting-Recordings/listUserMeetingRecordings">#</a></td>
      <td class="description"><p>Returns the list of meetings recordings for the current user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listUserMeetingRecordings" class="collapse" aria-labelledby="listUserMeetingRecordings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/meeting-recordings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">meetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a meeting. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified</td>
            </tr>
<tr>
	      <td class="n">meetingStartTimeFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Recordings of meetings started after the time specified will be returned. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified</td>
            </tr>
<tr>
	      <td class="n">meetingStartTimeTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Recordings of meetings started before the time specified will be returned. The default value is current time. Either `meetingId` or `meetingStartTime`/`meetingEndTime` can be specified</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Page number</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Number of items per page. The `max` value is supported to indicate the maximum size - 300</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Message Exports

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createMessageStoreReport" aria-expanded="true" aria-controls="createMessageStoreReport">Create Message Store Report</a> <a href="https://developers.ringcentral.com/api-reference/Message-Exports/createMessageStoreReport">#</a></td>
      <td class="description"><p>Creates a task to collect all account messages for a specified time interval.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createMessageStoreReport" class="collapse" aria-labelledby="createMessageStoreReport">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMessageStoreReportTask" aria-expanded="true" aria-controls="readMessageStoreReportTask">Get Message Store Report Task</a> <a href="https://developers.ringcentral.com/api-reference/Message-Exports/readMessageStoreReportTask">#</a></td>
      <td class="description"><p>Returns the current status of a task on report creation.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMessageStoreReportTask" class="collapse" aria-labelledby="readMessageStoreReportTask">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report/{taskId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMessageStoreReportArchive" aria-expanded="true" aria-controls="readMessageStoreReportArchive">Get Message Store Report Archive</a> <a href="https://developers.ringcentral.com/api-reference/Message-Exports/readMessageStoreReportArchive">#</a></td>
      <td class="description"><p>Returns the created report with message data not including attachments.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMessageStoreReportArchive" class="collapse" aria-labelledby="readMessageStoreReportArchive">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report/{taskId}/archive</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMessageStoreReportArchiveContent" aria-expanded="true" aria-controls="readMessageStoreReportArchiveContent">Get Message Store Report Archive Content</a> <a href="https://developers.ringcentral.com/api-reference/Message-Exports/readMessageStoreReportArchiveContent">#</a></td>
      <td class="description"><p>Returns one of the report archives with message contents in application/zip format.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMessageStoreReportArchiveContent" class="collapse" aria-labelledby="readMessageStoreReportArchiveContent">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-report/{taskId}/archive/{archiveId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">archiveId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Message Store

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listMessages" aria-expanded="true" aria-controls="listMessages">Get Message List</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/listMessages">#</a></td>
      <td class="description"><p>Returns the list of messages from an extension mailbox.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listMessages" class="collapse" aria-labelledby="listMessages">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">availability</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Specifies the availability status for the resulting messages. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">conversationId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Specifies the conversation identifier for the resulting messages</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours</td>
            </tr>
<tr>
	      <td class="n">dateTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The direction for the resulting messages. If not specified, both inbound and outbound messages are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">distinctConversations</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">If 'True', then the latest messages per every conversation ID are returned</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">messageType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The type of the resulting messages. If not specified, all messages without message type filtering are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">phoneNumber</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The phone number. If specified, messages are returned for this particular phone number only</td>
            </tr>
<tr>
	      <td class="n">readStatus</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The read status for the resulting messages. Multiple values are accepted</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteMessageByFilter" aria-expanded="true" aria-controls="deleteMessageByFilter">Delete Conversation</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/deleteMessageByFilter">#</a></td>
      <td class="description"><p>Deletes conversation(s) by conversation ID(s). Batch request is supported, max number of IDs passed as query/path parameters is 50. Alternative syntax is supported - user converations can be deleted by passing multiple IDs in request body as an array of string, max number of conversation IDs passed in request body is 100. In this case asterisk is used in the path instead of IDs</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteMessageByFilter" class="collapse" aria-labelledby="deleteMessageByFilter">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">conversationId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">dateTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Messages received earlier then the date specified will be deleted. The default value is current datetime</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d">All</td>
	      <td class="r">False</td>
	      <td class="de">Type of messages to be deleted</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMessage" aria-expanded="true" aria-controls="readMessage">Get Message</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/readMessage">#</a></td>
      <td class="description"><p>Returns individual message record(s) by the given message ID(s). The length of inbound messages is unlimited. Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMessage" class="collapse" aria-labelledby="readMessage">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">messageId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a message</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateMessage" aria-expanded="true" aria-controls="updateMessage">Update Message List</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/updateMessage">#</a></td>
      <td class="description"><p>Updates message(s) by ID(s). Currently only message read status can be updated. Batch request is supported, max number of IDs passed as query/path parameters is 50. Alternative syntax is supported - user messages can be updated by passing multiple IDs in request body as an array of string, max number of IDs passed in request body is 1000. In this case asterisk is used in the path instead of IDs</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateMessage" class="collapse" aria-labelledby="updateMessage">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">messageId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a message</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteMessage" aria-expanded="true" aria-controls="deleteMessage">Delete Message</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/deleteMessage">#</a></td>
      <td class="description"><p>Deletes message(s) by the given message ID(s). The first call of this method transfers the message to the 'Delete' status. The second call transfers the deleted message to the 'Purged' status. If it is required to make the message 'Purged' immediately (from the first call), then set the query parameter purge to 'True'.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteMessage" class="collapse" aria-labelledby="deleteMessage">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">conversationId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a message thread</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">messageId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a message</td>
            </tr>
<tr>
	      <td class="n">purge</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">If the value is 'True', then the message is purged immediately with all the attachments</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMessageContent" aria-expanded="true" aria-controls="readMessageContent">Get Message Content</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/readMessageContent">#</a></td>
      <td class="description"><p>Returns a specific message attachment data as media stream.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMessageContent" class="collapse" aria-labelledby="readMessageContent">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store/{messageId}/content/{attachmentId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">attachmentId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a message attachment</td>
            </tr>
<tr>
	      <td class="n">contentDisposition</td>
	      <td class="t">string</td>
	      <td class="d">Inline</td>
	      <td class="r">False</td>
	      <td class="de">Content disposition of a response</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">messageId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a message</td>
            </tr>
<tr>
	      <td class="n">Range</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#syncMessages" aria-expanded="true" aria-controls="syncMessages">Sync Messages</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/syncMessages">#</a></td>
      <td class="description"><p>Synchronizes messages.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="syncMessages" class="collapse" aria-labelledby="syncMessages">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-sync</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">conversationId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Conversation identifier for the resulting messages. Meaningful for SMS and Pager messages only.</td>
            </tr>
<tr>
	      <td class="n">dateFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is dateTo minus 24 hours</td>
            </tr>
<tr>
	      <td class="n">dateTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for resulting messages in ISO 8601 format including timezone, for example 2016-03-10T18:07:52.534Z. The default value is current time</td>
            </tr>
<tr>
	      <td class="n">direction</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Direction for the resulting messages. If not specified, both inbound and outbound messages are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">distinctConversations</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">If 'True', then the latest messages per every conversation ID are returned</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">messageType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type for the resulting messages. If not specified, all types of messages are returned. Multiple values are accepted</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Limits the number of records to be returned (works in combination with dateFrom and dateTo if specified)</td>
            </tr>
<tr>
	      <td class="n">syncToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Value of syncToken property of last sync request response</td>
            </tr>
<tr>
	      <td class="n">syncType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of message synchronization</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readMessageStoreConfiguration" aria-expanded="true" aria-controls="readMessageStoreConfiguration">Get Message Store Configuration</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/readMessageStoreConfiguration">#</a></td>
      <td class="description"><p>Returns message store settings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readMessageStoreConfiguration" class="collapse" aria-labelledby="readMessageStoreConfiguration">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-configuration</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateMessageStoreConfiguration" aria-expanded="true" aria-controls="updateMessageStoreConfiguration">Update Message Store Configuration</a> <a href="https://developers.ringcentral.com/api-reference/Message-Store/updateMessageStoreConfiguration">#</a></td>
      <td class="description"><p>Updates message store settings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateMessageStoreConfiguration" class="collapse" aria-labelledby="updateMessageStoreConfiguration">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/message-store-configuration</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### MMS

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createMMS" aria-expanded="true" aria-controls="createMMS">Create MMS Message</a> <a href="https://developers.ringcentral.com/api-reference/MMS/createMMS">#</a></td>
      <td class="description"><p>Creates and sends media messages. Sending MMS messages simultaneously to different recipients is limited up to 50 requests per minute; relevant for all client applications.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createMMS" class="collapse" aria-labelledby="createMMS">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/mms</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">MMS envelope and content</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Notes

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createChatNote" aria-expanded="true" aria-controls="createChatNote">Create Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/createChatNote">#</a></td>
      <td class="description"><p>Creates a new note in the specified chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createChatNote" class="collapse" aria-labelledby="createChatNote">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/notes</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat to create a note in</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listChatNotes" aria-expanded="true" aria-controls="listChatNotes">Get Chat Notes</a> <a href="https://developers.ringcentral.com/api-reference/Notes/listChatNotes">#</a></td>
      <td class="description"><p>Returns the list of notes created in the specified chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listChatNotes" class="collapse" aria-labelledby="listChatNotes">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/notes</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat to fetch notes from.</td>
            </tr>
<tr>
	      <td class="n">creationTimeFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone</td>
            </tr>
<tr>
	      <td class="n">creationTimeTo</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2019-03-10T18:23:45. The default value is Now.</td>
            </tr>
<tr>
	      <td class="n">creatorId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of the user that created the note. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Max number of notes to be fetched by one request; the value range is 1-250.</td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Status of notes to be fetched; if not specified all notes are fetched by default.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserNote" aria-expanded="true" aria-controls="readUserNote">Get Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/readUserNote">#</a></td>
      <td class="description"><p>Returns the specified note(s). It is possible to fetch up to 50 notes per request.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserNote" class="collapse" aria-labelledby="readUserNote">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#patchNote" aria-expanded="true" aria-controls="patchNote">Update Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/patchNote">#</a></td>
      <td class="description"><p>Edits a note. Notes can be edited by any user if posted to a chat the user belongs to.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="patchNote" class="collapse" aria-labelledby="patchNote">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">noteId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a note to be updated</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteNote" aria-expanded="true" aria-controls="deleteNote">Delete Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/deleteNote">#</a></td>
      <td class="description"><p>Deletes the specified note.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteNote" class="collapse" aria-labelledby="deleteNote">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#lockNote" aria-expanded="true" aria-controls="lockNote">Lock Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/lockNote">#</a></td>
      <td class="description"><p>Locks a note providing the user with the unique write access for 5 hours.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="lockNote" class="collapse" aria-labelledby="lockNote">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}/lock</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#unlockNote" aria-expanded="true" aria-controls="unlockNote">Unlock Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/unlockNote">#</a></td>
      <td class="description"><p>Unlocks a note letting other users edit this note. Once the note is locked (by another user) it cannot be unlocked during 5 hours since the lock datetime.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="unlockNote" class="collapse" aria-labelledby="unlockNote">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}/unlock</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#publishNote" aria-expanded="true" aria-controls="publishNote">Publish Note</a> <a href="https://developers.ringcentral.com/api-reference/Notes/publishNote">#</a></td>
      <td class="description"><p>Publishes a note making it visible to other users.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="publishNote" class="collapse" aria-labelledby="publishNote">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/notes/{noteId}/publish</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### OAuth 2.0

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#authorize" aria-expanded="true" aria-controls="authorize">Authorize</a> <a href="https://developers.ringcentral.com/api-reference/OAuth-2.0/authorize">#</a></td>
      <td class="description"><p>Returns a link to a login page location.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="authorize" class="collapse" aria-labelledby="authorize">
          <p>GET https://platform.ringcentral.com/restapi/oauth/authorize</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accept_language</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">brand_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Brand identifier. If it is not provided in request, server will try to determine brand from client app profile. The default value is '1210' - RingCentral US</td>
            </tr>
<tr>
	      <td class="n">client_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Identifier (key) of a client application</td>
            </tr>
<tr>
	      <td class="n">code_challenge</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">code_challenge_method</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">display</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Style of login form. The default value is 'page'. The 'popup' and 'touch' values are featured for mobile applications</td>
            </tr>
<tr>
	      <td class="n">localeId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Localization code of a language. Overwrites 'Accept-Language' header value</td>
            </tr>
<tr>
	      <td class="n">nonce</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">prompt</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Specifies which login form will be displayed. Space-separated set of the following values: 'login' - official RingCentral login form, 'sso' - Single Sign-On login form, 'consent' - form to show the requested scope and prompt user for consent. Either 'login' or 'sso' (or both) must be specified. The default value is 'login&sso'</td>
            </tr>
<tr>
	      <td class="n">redirect_uri</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration</td>
            </tr>
<tr>
	      <td class="n">request</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">request_uri</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">response_type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Determines authorization flow: **code** - Authorization Code, **token** - Implicit Grant</td>
            </tr>
<tr>
	      <td class="n">scope</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">state</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Client state. Returned back to the client at the end of the flow</td>
            </tr>
<tr>
	      <td class="n">ui_locales</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Localization code of a language. Overwrites 'localeId' parameter value</td>
            </tr>
<tr>
	      <td class="n">ui_options</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">User interface options data</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#revokeToken" aria-expanded="true" aria-controls="revokeToken">Revoke Token</a> <a href="https://developers.ringcentral.com/api-reference/OAuth-2.0/revokeToken">#</a></td>
      <td class="description"><p>Revokes access/refresh token. Requests to this endpoint must be authenticated with HTTP Basic scheme using the application key and application secret as login and password, correspondingly.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="revokeToken" class="collapse" aria-labelledby="revokeToken">
          <p>POST https://platform.ringcentral.com/restapi/oauth/revoke</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">client_assertion</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">client_assertion_type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">token</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Active access or refresh token to be revoked</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#getToken" aria-expanded="true" aria-controls="getToken">Get Token</a> <a href="https://developers.ringcentral.com/api-reference/OAuth-2.0/getToken">#</a></td>
      <td class="description"><p>Returns access tokens for making API requests</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="getToken" class="collapse" aria-labelledby="getToken">
          <p>POST https://platform.ringcentral.com/restapi/oauth/token</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">access_token_ttl</td>
	      <td class="t">integer</td>
	      <td class="d">3600</td>
	      <td class="r">False</td>
	      <td class="de">Access token lifetime in seconds</td>
            </tr>
<tr>
	      <td class="n">account_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">assertion</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">brand_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">client_assertion</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">client_assertion_type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">client_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">code</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Authorization code</td>
            </tr>
<tr>
	      <td class="n">code_verifier</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">endpoint_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The unique identifier of a client application. If not specified, the previously specified or auto generated value is used by default</td>
            </tr>
<tr>
	      <td class="n">extension</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Optional. Extension short number. If company number is specified as a username, and extension is not specified, the server will attempt to authenticate client as main company administrator</td>
            </tr>
<tr>
	      <td class="n">grant_type</td>
	      <td class="t">string</td>
	      <td class="d">password</td>
	      <td class="r">False</td>
	      <td class="de">Grant type</td>
            </tr>
<tr>
	      <td class="n">partner_account_id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">password</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">User's password</td>
            </tr>
<tr>
	      <td class="n">pin</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">redirect_uri</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">This is a callback URI which determines where the response is sent. The value of this parameter must exactly match one of the URIs you have provided for your app upon registration</td>
            </tr>
<tr>
	      <td class="n">refresh_token</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Previously issued refresh token. This is the only formData field used for the Refresh Token Flow.</td>
            </tr>
<tr>
	      <td class="n">refresh_token_ttl</td>
	      <td class="t">integer</td>
	      <td class="d">604800</td>
	      <td class="r">False</td>
	      <td class="de">Refresh token lifetime in seconds</td>
            </tr>
<tr>
	      <td class="n">scope</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">List of API permissions to be used with access token. Can be omitted when requesting all permissions defined during the application registration phase</td>
            </tr>
<tr>
	      <td class="n">username</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Phone number linked to an account or extension in E.164 format with or without leading '+' sign</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Pager Messages

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createInternalTextMessage" aria-expanded="true" aria-controls="createInternalTextMessage">Create Internal Text Message</a> <a href="https://developers.ringcentral.com/api-reference/Pager-Messages/createInternalTextMessage">#</a></td>
      <td class="description"><p>Creates and sends an internal text message.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createInternalTextMessage" class="collapse" aria-labelledby="createInternalTextMessage">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/company-pager</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Paging Only Groups

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listPagingGroupUsers" aria-expanded="true" aria-controls="listPagingGroupUsers">Get Paging Group Users</a> <a href="https://developers.ringcentral.com/api-reference/Paging-Only-Groups/listPagingGroupUsers">#</a></td>
      <td class="description"><p>Returns the list of users allowed to page this group.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listPagingGroupUsers" class="collapse" aria-labelledby="listPagingGroupUsers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/paging-only-groups/{pagingOnlyGroupId}/users</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">pagingOnlyGroupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listPagingGroupDevices" aria-expanded="true" aria-controls="listPagingGroupDevices">Get Paging Group Devices</a> <a href="https://developers.ringcentral.com/api-reference/Paging-Only-Groups/listPagingGroupDevices">#</a></td>
      <td class="description"><p>Returns the list of paging devices assigned to this group.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listPagingGroupDevices" class="collapse" aria-labelledby="listPagingGroupDevices">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/paging-only-groups/{pagingOnlyGroupId}/devices</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">pagingOnlyGroupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#assignMultiplePagingGroupUsersDevices" aria-expanded="true" aria-controls="assignMultiplePagingGroupUsersDevices">Assign Paging Group Users and Devices</a> <a href="https://developers.ringcentral.com/api-reference/Paging-Only-Groups/assignMultiplePagingGroupUsersDevices">#</a></td>
      <td class="description"><p>Adds and/or removes paging group users and devices.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="assignMultiplePagingGroupUsersDevices" class="collapse" aria-labelledby="assignMultiplePagingGroupUsersDevices">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/paging-only-groups/{pagingOnlyGroupId}/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">pagingOnlyGroupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Phone Numbers

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listExtensionPhoneNumbers" aria-expanded="true" aria-controls="listExtensionPhoneNumbers">Get Extension Phone Number List</a> <a href="https://developers.ringcentral.com/api-reference/Phone-Numbers/listExtensionPhoneNumbers">#</a></td>
      <td class="description"><p>Returns the list of phone numbers that are used by a particular extension, and can be filtered by the phone number type. The returned list contains all numbers which are directly mapped to a given extension plus the features and also company-level numbers which may be used when performing different operations on behalf of this extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listExtensionPhoneNumbers" class="collapse" aria-labelledby="listExtensionPhoneNumbers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/phone-number</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are allowed. Default value is '1'</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items). If not specified, the value is '100' by default</td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Status of a phone number. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">usageType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Usage type of a phone number</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listAccountPhoneNumbers" aria-expanded="true" aria-controls="listAccountPhoneNumbers">Get Company Phone Number List</a> <a href="https://developers.ringcentral.com/api-reference/Phone-Numbers/listAccountPhoneNumbers">#</a></td>
      <td class="description"><p>Returns the list of phone numbers assigned to RingCentral customer account. Both company-level and extension-level numbers are returned.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listAccountPhoneNumbers" class="collapse" aria-labelledby="listAccountPhoneNumbers">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/phone-number</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Status of a phone number. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">usageType</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Usage type of a phone number</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAccountPhoneNumber" aria-expanded="true" aria-controls="readAccountPhoneNumber">Get Phone Number</a> <a href="https://developers.ringcentral.com/api-reference/Phone-Numbers/readAccountPhoneNumber">#</a></td>
      <td class="description"><p>Returns the phone number(s) belonging to a certain account or extension by phoneNumberId(s). Batch request is supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAccountPhoneNumber" class="collapse" aria-labelledby="readAccountPhoneNumber">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/phone-number/{phoneNumberId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">phoneNumberId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a phone number</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#parsePhoneNumber" aria-expanded="true" aria-controls="parsePhoneNumber">Parse Phone Number</a> <a href="https://developers.ringcentral.com/api-reference/Phone-Numbers/parsePhoneNumber">#</a></td>
      <td class="description"><p>Returns one or more parsed and/or formatted phone numbers that are passed as a string.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="parsePhoneNumber" class="collapse" aria-labelledby="parsePhoneNumber">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/number-parser/parse</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">homeCountry</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a home country. The default value is ISO code (ISO 3166) of the user's home country or brand country, if the user is undefined</td>
            </tr>
<tr>
	      <td class="n">nationalAsPriority</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The default value is 'False'. If 'True', the numbers that are closer to the home country are given higher priority</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Posts

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipPost" aria-expanded="true" aria-controls="readGlipPost">Get Post</a> <a href="https://developers.ringcentral.com/api-reference/Posts/readGlipPost">#</a></td>
      <td class="description"><p>Returns information about the specified post.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipPost" class="collapse" aria-labelledby="readGlipPost">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts/{postId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat.</td>
            </tr>
<tr>
	      <td class="n">postId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a post.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#patchGlipPost" aria-expanded="true" aria-controls="patchGlipPost">Update Post</a> <a href="https://developers.ringcentral.com/api-reference/Posts/patchGlipPost">#</a></td>
      <td class="description"><p>Updates a specific post within a chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="patchGlipPost" class="collapse" aria-labelledby="patchGlipPost">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts/{postId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat.</td>
            </tr>
<tr>
	      <td class="n">postId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a post to be updated.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteGlipPost" aria-expanded="true" aria-controls="deleteGlipPost">Delete Post</a> <a href="https://developers.ringcentral.com/api-reference/Posts/deleteGlipPost">#</a></td>
      <td class="description"><p>Deletes the specified post from the chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteGlipPost" class="collapse" aria-labelledby="deleteGlipPost">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts/{postId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat.</td>
            </tr>
<tr>
	      <td class="n">postId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a post to be deleted.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipPosts" aria-expanded="true" aria-controls="readGlipPosts">Get Posts</a> <a href="https://developers.ringcentral.com/api-reference/Posts/readGlipPosts">#</a></td>
      <td class="description"><p>Returns a list of posts from the specified chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipPosts" class="collapse" aria-labelledby="readGlipPosts">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat.</td>
            </tr>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token.</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Max number of posts to be fetched by one request (Not more than 250).</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipPost" aria-expanded="true" aria-controls="createGlipPost">Create Post</a> <a href="https://developers.ringcentral.com/api-reference/Posts/createGlipPost">#</a></td>
      <td class="description"><p>Creates a post within the specified chat. Attachments are supported.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipPost" class="collapse" aria-labelledby="createGlipPost">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/posts</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipGroupPosts" aria-expanded="true" aria-controls="listGlipGroupPosts">Get Group Posts</a> <a href="https://developers.ringcentral.com/api-reference/Posts/listGlipGroupPosts">#</a></td>
      <td class="description"><p>Returns posts which are available for the current user by group ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipGroupPosts" class="collapse" aria-labelledby="listGlipGroupPosts">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/posts</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a group</td>
            </tr>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Max number of records to be returned</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipGroupPost" aria-expanded="true" aria-controls="createGlipGroupPost">Create Post in Group</a> <a href="https://developers.ringcentral.com/api-reference/Posts/createGlipGroupPost">#</a></td>
      <td class="description"><p>Creates a new post in a group specified.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipGroupPost" class="collapse" aria-labelledby="createGlipGroupPost">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/posts</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a group.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateGlipPostText" aria-expanded="true" aria-controls="updateGlipPostText">Update Post</a> <a href="https://developers.ringcentral.com/api-reference/Posts/updateGlipPostText">#</a></td>
      <td class="description"><p>Modifies text of a post.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateGlipPostText" class="collapse" aria-labelledby="updateGlipPostText">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/glip/groups/{groupId}/posts/{postId}/text</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a group</td>
            </tr>
<tr>
	      <td class="n">postId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a post</td>
            </tr>
<tr>
	      <td class="n">text</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipCard" aria-expanded="true" aria-controls="createGlipCard">Create Card</a> <a href="https://developers.ringcentral.com/api-reference/Posts/createGlipCard">#</a></td>
      <td class="description"><p>Creates a new message.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipCard" class="collapse" aria-labelledby="createGlipCard">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/cards</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of a group where to create a post with the card</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipCard" aria-expanded="true" aria-controls="readGlipCard">Get Card</a> <a href="https://developers.ringcentral.com/api-reference/Posts/readGlipCard">#</a></td>
      <td class="description"><p>Returns card(s) with given id(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipCard" class="collapse" aria-labelledby="readGlipCard">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/cards/{cardId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateGlipCard" aria-expanded="true" aria-controls="updateGlipCard">Update Card</a> <a href="https://developers.ringcentral.com/api-reference/Posts/updateGlipCard">#</a></td>
      <td class="description"><p>Updates a card.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateGlipCard" class="collapse" aria-labelledby="updateGlipCard">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/glip/cards/{cardId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">cardId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a card</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteGlipCard" aria-expanded="true" aria-controls="deleteGlipCard">Delete Card</a> <a href="https://developers.ringcentral.com/api-reference/Posts/deleteGlipCard">#</a></td>
      <td class="description"><p>Deletes a card by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteGlipCard" class="collapse" aria-labelledby="deleteGlipCard">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/cards/{cardId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipPosts" aria-expanded="true" aria-controls="listGlipPosts">Get Posts</a> <a href="https://developers.ringcentral.com/api-reference/Posts/listGlipPosts">#</a></td>
      <td class="description"><p>Returns posts available for the current user by group ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipPosts" class="collapse" aria-labelledby="listGlipPosts">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/posts</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">groupId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Identifier of a group to filter posts</td>
            </tr>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Token of a page to be returned</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of records to be returned. The maximum value is 250, by default - 30</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createPost" aria-expanded="true" aria-controls="createPost">Create Post</a> <a href="https://developers.ringcentral.com/api-reference/Posts/createPost">#</a></td>
      <td class="description"><p>Creates a post.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createPost" class="collapse" aria-labelledby="createPost">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/posts</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Presence

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserPresenceStatus" aria-expanded="true" aria-controls="readUserPresenceStatus">Get User Presence Status</a> <a href="https://developers.ringcentral.com/api-reference/Presence/readUserPresenceStatus">#</a></td>
      <td class="description"><p>Returns presence status of an extension or several extensions by their ID(s). Batch request is supported. The 'presenceStatus' is returned as Offline (the parameters 'telephonyStatus', 'message', 'userStatus' and 'dndStatus' are not returned at all) for the following extension types: Department/Announcement Only/Take Messages Only (Voicemail)/Fax User/Paging Only Group/Shared Lines Group/IVR Menu/Application Extension/Park Location.If the user requests his/her own presence status, the response contains actual presence status even if the status publication is turned off. Batch request is supported. For batch requests the number of extensions in one request is limited to 30. If more extensions are included in the request, the error code 400 Bad Request is returned with the logical error code InvalidMultipartRequest and the corresponding message 'Extension Presence Info multipart request is limited to 30 extensions'.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserPresenceStatus" class="collapse" aria-labelledby="readUserPresenceStatus">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">detailedTelephonyState</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Whether to return detailed telephony state</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">sipData</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Whether to return SIP data</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateUserPresenceStatus" aria-expanded="true" aria-controls="updateUserPresenceStatus">Update User Presence Status</a> <a href="https://developers.ringcentral.com/api-reference/Presence/updateUserPresenceStatus">#</a></td>
      <td class="description"><p>Updates user-defined extension presence status, status message and DnD status by extension ID. Supported for regular User extensions only. The extension types listed do not support presence status: Department, Announcement Only, Take Messages Only (Voicemail), Fax User, Paging Only Group, Shared Lines Group, IVR Menu, Application Extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateUserPresenceStatus" class="collapse" aria-labelledby="updateUserPresenceStatus">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAccountPresence" aria-expanded="true" aria-controls="readAccountPresence">Get User Presence Status List</a> <a href="https://developers.ringcentral.com/api-reference/Presence/readAccountPresence">#</a></td>
      <td class="description"><p>Returns presence status of all extensions of an account. Please note: The presenceStatus is returned as Offline (the parameters telephonyStatus, message, userStatus and dndStatus are not returned at all) for the following extension types: Department, Announcement Only, Voicemail (Take Messages Only), Fax User, Paging Only Group, Shared Lines Group, IVR Menu, Application Extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAccountPresence" class="collapse" aria-labelledby="readAccountPresence">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/presence</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">detailedTelephonyState</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Whether to return detailed telephony state</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Page number for account presence information</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Number for account presence information items per page</td>
            </tr>
<tr>
	      <td class="n">sipData</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Whether to return SIP data</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUnifiedPresence" aria-expanded="true" aria-controls="readUnifiedPresence">Get Unified Presence</a> <a href="https://developers.ringcentral.com/api-reference/Presence/readUnifiedPresence">#</a></td>
      <td class="description"><p>Returns the unified presence status of the requested user(s). The set of parameters returned by this method differs whether you return the requester's presence or any other user presence.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUnifiedPresence" class="collapse" aria-labelledby="readUnifiedPresence">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/unified-presence</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">None</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">None</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateUnifiedPresence" aria-expanded="true" aria-controls="updateUnifiedPresence">Update Unified Presence</a> <a href="https://developers.ringcentral.com/api-reference/Presence/updateUnifiedPresence">#</a></td>
      <td class="description"><p>Updates the unified presence for the current user specified in path.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateUnifiedPresence" class="collapse" aria-labelledby="updateUnifiedPresence">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/unified-presence</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">None</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">None</td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Regional Settings

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listLanguages" aria-expanded="true" aria-controls="listLanguages">Get Language List</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/listLanguages">#</a></td>
      <td class="description"><p>Returns the information about supported languages.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listLanguages" class="collapse" aria-labelledby="listLanguages">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/language</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readLanguage" aria-expanded="true" aria-controls="readLanguage">Get Language</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/readLanguage">#</a></td>
      <td class="description"><p>Returns language by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readLanguage" class="collapse" aria-labelledby="readLanguage">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/language/{languageId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCountries" aria-expanded="true" aria-controls="listCountries">Get Country List</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/listCountries">#</a></td>
      <td class="description"><p>Returns all the countries available for calling.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCountries" class="collapse" aria-labelledby="listCountries">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/country</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">freeSoftphoneLine</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Specifies if free phone line for softphone is available for a country or not</td>
            </tr>
<tr>
	      <td class="n">loginAllowed</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Specifies whether login with the phone numbers of this country is enabled or not</td>
            </tr>
<tr>
	      <td class="n">numberSelling</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Specifies if RingCentral sells phone numbers of this country</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">signupAllowed</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Indicates whether signup/billing is allowed for a country. If not specified all countries are returned (according to other filters specified if any)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCountry" aria-expanded="true" aria-controls="readCountry">Get Country</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/readCountry">#</a></td>
      <td class="description"><p>Returns the information on a specific country.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCountry" class="collapse" aria-labelledby="readCountry">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/country/{countryId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listLocations" aria-expanded="true" aria-controls="listLocations">Get Location List</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/listLocations">#</a></td>
      <td class="description"><p>Returns all available locations for a certain state.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listLocations" class="collapse" aria-labelledby="listLocations">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/location</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">orderBy</td>
	      <td class="t">string</td>
	      <td class="d">City</td>
	      <td class="r">False</td>
	      <td class="de">Sorts results by the property specified</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">stateId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a state</td>
            </tr>
<tr>
	      <td class="n">withNxx</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Specifies if nxx codes are returned</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listStates" aria-expanded="true" aria-controls="listStates">Get States List</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/listStates">#</a></td>
      <td class="description"><p>Returns all the states of a certain country</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listStates" class="collapse" aria-labelledby="listStates">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/state</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">allCountries</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">If set to 'True' then states for all countries are returned and `countryId` is ignored, even if specified. If the value is empty then the parameter is ignored</td>
            </tr>
<tr>
	      <td class="n">countryId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a country</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">withPhoneNumbers</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">If 'True', the list of states with phone numbers available for buying is returned</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readState" aria-expanded="true" aria-controls="readState">Get State</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/readState">#</a></td>
      <td class="description"><p>Returns the information on a specific state.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readState" class="collapse" aria-labelledby="readState">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/state/{stateId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listTimezones" aria-expanded="true" aria-controls="listTimezones">Get Timezone List</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/listTimezones">#</a></td>
      <td class="description"><p>Returns all available timezones.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listTimezones" class="collapse" aria-labelledby="listTimezones">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">page</td>
	      <td class="t">string</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">string</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readTimezone" aria-expanded="true" aria-controls="readTimezone">Get Timezone</a> <a href="https://developers.ringcentral.com/api-reference/Regional-Settings/readTimezone">#</a></td>
      <td class="description"><p>Returns the information on a certain timezone.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readTimezone" class="collapse" aria-labelledby="readTimezone">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/timezone/{timezoneId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">page</td>
	      <td class="t">string</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">string</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items)</td>
            </tr>
<tr>
	      <td class="n">timezoneId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a timezone</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### RingOut

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createRingOutCall" aria-expanded="true" aria-controls="createRingOutCall">Make RingOut Call</a> <a href="https://developers.ringcentral.com/api-reference/RingOut/createRingOutCall">#</a></td>
      <td class="description"><p>Makes a 2-leg RingOut call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createRingOutCall" class="collapse" aria-labelledby="createRingOutCall">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readRingOutCallStatus" aria-expanded="true" aria-controls="readRingOutCallStatus">Get RingOut Call Status</a> <a href="https://developers.ringcentral.com/api-reference/RingOut/readRingOutCallStatus">#</a></td>
      <td class="description"><p>Returns the status of a 2-leg RingOut call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readRingOutCallStatus" class="collapse" aria-labelledby="readRingOutCallStatus">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out/{ringoutId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ringoutId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingOut call</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteRingOutCall" aria-expanded="true" aria-controls="deleteRingOutCall">Cancel RingOut Call</a> <a href="https://developers.ringcentral.com/api-reference/RingOut/deleteRingOutCall">#</a></td>
      <td class="description"><p>Cancels a 2-leg RingOut call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteRingOutCall" class="collapse" aria-labelledby="deleteRingOutCall">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ring-out/{ringoutId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ringoutId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingOut call</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createRingOutCallDeprecated" aria-expanded="true" aria-controls="createRingOutCallDeprecated">Make RingOut Call</a> <a href="https://developers.ringcentral.com/api-reference/RingOut/createRingOutCallDeprecated">#</a></td>
      <td class="description"><p>Makes a 2-leg RingOut call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createRingOutCallDeprecated" class="collapse" aria-labelledby="createRingOutCallDeprecated">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ringout</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readRingOutCallStatusDeprecated" aria-expanded="true" aria-controls="readRingOutCallStatusDeprecated">Get RingOut Call Status</a> <a href="https://developers.ringcentral.com/api-reference/RingOut/readRingOutCallStatusDeprecated">#</a></td>
      <td class="description"><p>Returns status of a 2-leg RingOut call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readRingOutCallStatusDeprecated" class="collapse" aria-labelledby="readRingOutCallStatusDeprecated">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ringout/{ringoutId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ringoutId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingOut call</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteRingOutCallDeprecated" aria-expanded="true" aria-controls="deleteRingOutCallDeprecated">Cancel RingOut Call</a> <a href="https://developers.ringcentral.com/api-reference/RingOut/deleteRingOutCallDeprecated">#</a></td>
      <td class="description"><p>Cancels a 2-leg RingOut call.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteRingOutCallDeprecated" class="collapse" aria-labelledby="deleteRingOutCallDeprecated">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/ringout/{ringoutId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ringoutId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingOut call</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Rule Management

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listAnsweringRules" aria-expanded="true" aria-controls="listAnsweringRules">Get Call Handling Rules</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/listAnsweringRules">#</a></td>
      <td class="description"><p>Returns the extension answering rules.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listAnsweringRules" class="collapse" aria-labelledby="listAnsweringRules">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">enabledOnly</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">If true, then only active call handling rules are returned</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">string</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">string</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">view</td>
	      <td class="t">string</td>
	      <td class="d">Simple</td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createAnsweringRule" aria-expanded="true" aria-controls="createAnsweringRule">Create Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/createAnsweringRule">#</a></td>
      <td class="description"><p>Creates a custom answering rule for a particular caller ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createAnsweringRule" class="collapse" aria-labelledby="createAnsweringRule">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAnsweringRule" aria-expanded="true" aria-controls="readAnsweringRule">Get Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/readAnsweringRule">#</a></td>
      <td class="description"><p>Returns an answering rule by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAnsweringRule" class="collapse" aria-labelledby="readAnsweringRule">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ruleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either 'business-hours-rule' or 'after-hours-rule'</td>
            </tr>
<tr>
	      <td class="n">showInactiveNumbers</td>
	      <td class="t">boolean</td>
	      <td class="d">False</td>
	      <td class="r">False</td>
	      <td class="de">Indicates whether inactive numbers should be returned or not</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateAnsweringRule" aria-expanded="true" aria-controls="updateAnsweringRule">Update Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/updateAnsweringRule">#</a></td>
      <td class="description"><p>Updates a custom answering rule for a particular caller ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateAnsweringRule" class="collapse" aria-labelledby="updateAnsweringRule">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ruleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteAnsweringRule" aria-expanded="true" aria-controls="deleteAnsweringRule">Delete Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/deleteAnsweringRule">#</a></td>
      <td class="description"><p>Deletes a custom answering rule by a particular ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteAnsweringRule" class="collapse" aria-labelledby="deleteAnsweringRule">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/answering-rule/{ruleId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ruleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createCompanyAnsweringRule" aria-expanded="true" aria-controls="createCompanyAnsweringRule">Create Company Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/createCompanyAnsweringRule">#</a></td>
      <td class="description"><p>Creates a company answering rule for a particular caller ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createCompanyAnsweringRule" class="collapse" aria-labelledby="createCompanyAnsweringRule">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCompanyAnsweringRules" aria-expanded="true" aria-controls="listCompanyAnsweringRules">Get Company Call Handling Rule List</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/listCompanyAnsweringRules">#</a></td>
      <td class="description"><p>Returns a list of company answering rules.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCompanyAnsweringRules" class="collapse" aria-labelledby="listCompanyAnsweringRules">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items per page)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCompanyAnsweringRule" aria-expanded="true" aria-controls="readCompanyAnsweringRule">Get Company Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/readCompanyAnsweringRule">#</a></td>
      <td class="description"><p>Returns a company answering rule by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCompanyAnsweringRule" class="collapse" aria-labelledby="readCompanyAnsweringRule">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule/{ruleId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ruleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either 'business-hours-rule' or 'after-hours-rule'</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCompanyAnsweringRule" aria-expanded="true" aria-controls="updateCompanyAnsweringRule">Update Company Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/updateCompanyAnsweringRule">#</a></td>
      <td class="description"><p>Updates a company answering rule.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCompanyAnsweringRule" class="collapse" aria-labelledby="updateCompanyAnsweringRule">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule/{ruleId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">ruleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule. The value can be standard digital ID or specific ID - either 'business-hours-rule' or 'after-hours-rule'</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCompanyAnsweringRule" aria-expanded="true" aria-controls="deleteCompanyAnsweringRule">Delete Company Call Handling Rule</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/deleteCompanyAnsweringRule">#</a></td>
      <td class="description"><p>Deletes a company custom answering rule by a particular ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCompanyAnsweringRule" class="collapse" aria-labelledby="deleteCompanyAnsweringRule">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/answering-rule/{ruleId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">ruleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listStandardGreetings" aria-expanded="true" aria-controls="listStandardGreetings">Get Standard Greeting List</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/listStandardGreetings">#</a></td>
      <td class="description"><p>Returns the list of predefined standard greetings. Custom greetings recorded by user are not returned in response to this request. See Get Extension Custom Greetings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listStandardGreetings" class="collapse" aria-labelledby="listStandardGreetings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">page</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page number to retrieve. Only positive number values are accepted.</td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">Indicates the page size (number of items).</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of a greeting, specifying the case when the greeting is played</td>
            </tr>
<tr>
	      <td class="n">usageType</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Usage type of a greeting, specifying if the greeting is applied for user extension or department extension</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readStandardGreeting" aria-expanded="true" aria-controls="readStandardGreeting">Get Standard Greeting</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/readStandardGreeting">#</a></td>
      <td class="description"><p>Returns a standard greeting by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readStandardGreeting" class="collapse" aria-labelledby="readStandardGreeting">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/dictionary/greeting/{greetingId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createCompanyGreeting" aria-expanded="true" aria-controls="createCompanyGreeting">Create Company Greeting</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/createCompanyGreeting">#</a></td>
      <td class="description"><p>Creates a custom company greeting.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createCompanyGreeting" class="collapse" aria-labelledby="createCompanyGreeting">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/greeting</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">answeringRuleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of an answering rule</td>
            </tr>
<tr>
	      <td class="n">binary</td>
	      <td class="t">file</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Meida file to upload</td>
            </tr>
<tr>
	      <td class="n">languageId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de">Internal identifier of a language. See Get Language List</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Type of a greeting, specifying the case when the greeting is played.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createCustomUserGreeting" aria-expanded="true" aria-controls="createCustomUserGreeting">Create Custom User Greeting</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/createCustomUserGreeting">#</a></td>
      <td class="description"><p>Creates custom greeting for an extension user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createCustomUserGreeting" class="collapse" aria-labelledby="createCustomUserGreeting">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/greeting</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">answeringRuleId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an answering rule</td>
            </tr>
<tr>
	      <td class="n">binary</td>
	      <td class="t">file</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Meida file to upload</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Type of a greeting, specifying the case when the greeting is played.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCustomGreeting" aria-expanded="true" aria-controls="readCustomGreeting">Get Custom Greeting</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/readCustomGreeting">#</a></td>
      <td class="description"><p>Returns a custom user greeting by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCustomGreeting" class="collapse" aria-labelledby="readCustomGreeting">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/greeting/{greetingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">greetingId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a greeting</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readCallRecordingSettings" aria-expanded="true" aria-controls="readCallRecordingSettings">Get Call Recording Settings</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/readCallRecordingSettings">#</a></td>
      <td class="description"><p>Returns call recording settings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readCallRecordingSettings" class="collapse" aria-labelledby="readCallRecordingSettings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCallRecordingSettings" aria-expanded="true" aria-controls="updateCallRecordingSettings">Update Call Recording Settings</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/updateCallRecordingSettings">#</a></td>
      <td class="description"><p>Updates current call recording settings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCallRecordingSettings" class="collapse" aria-labelledby="updateCallRecordingSettings">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">false</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallRecordingExtensions" aria-expanded="true" aria-controls="listCallRecordingExtensions">Get Call Recording Extension List</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/listCallRecordingExtensions">#</a></td>
      <td class="description"><p>Returns the list of extensions to be recorded.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallRecordingExtensions" class="collapse" aria-labelledby="listCallRecordingExtensions">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/extensions</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateCallRecordingExtensionList" aria-expanded="true" aria-controls="updateCallRecordingExtensionList">Update Call Recording Extension List</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/updateCallRecordingExtensionList">#</a></td>
      <td class="description"><p>Creates or updates the list of extensions to be recorded.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateCallRecordingExtensionList" class="collapse" aria-labelledby="updateCallRecordingExtensionList">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/bulk-assign</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listCallRecordingCustomGreetings" aria-expanded="true" aria-controls="listCallRecordingCustomGreetings">Get Call Recording Custom Greeting List</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/listCallRecordingCustomGreetings">#</a></td>
      <td class="description"><p>Returns call recording custom greetings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listCallRecordingCustomGreetings" class="collapse" aria-labelledby="listCallRecordingCustomGreetings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/custom-greetings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">type</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCallRecordingCustomGreetingList" aria-expanded="true" aria-controls="deleteCallRecordingCustomGreetingList">Delete Call Recording Custom Greeting List</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/deleteCallRecordingCustomGreetingList">#</a></td>
      <td class="description"><p>Deletes call recording custom greetings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCallRecordingCustomGreetingList" class="collapse" aria-labelledby="deleteCallRecordingCustomGreetingList">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/custom-greetings</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteCallRecordingCustomGreeting" aria-expanded="true" aria-controls="deleteCallRecordingCustomGreeting">Delete Call Recording Custom Greeting</a> <a href="https://developers.ringcentral.com/api-reference/Rule-Management/deleteCallRecordingCustomGreeting">#</a></td>
      <td class="description"><p>Deletes call recording custom greeting(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteCallRecordingCustomGreeting" class="collapse" aria-labelledby="deleteCallRecordingCustomGreeting">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/call-recording/custom-greetings/{greetingId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">greetingId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### SCIM

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#checkHealth" aria-expanded="true" aria-controls="checkHealth">Check Health</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/checkHealth">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="checkHealth" class="collapse" aria-labelledby="checkHealth">
          <p>GET https://platform.ringcentral.com/scim/health</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#checkHealth2" aria-expanded="true" aria-controls="checkHealth2">Check Health</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/checkHealth2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="checkHealth2" class="collapse" aria-labelledby="checkHealth2">
          <p>GET https://platform.ringcentral.com/scim/v2/health</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readServiceProviderConfig2" aria-expanded="true" aria-controls="readServiceProviderConfig2">Get Service Provider Config</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/readServiceProviderConfig2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readServiceProviderConfig2" class="collapse" aria-labelledby="readServiceProviderConfig2">
          <p>GET https://platform.ringcentral.com/scim/v2/ServiceProviderConfig</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readServiceProviderConfig" aria-expanded="true" aria-controls="readServiceProviderConfig">Get Service Provider Config</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/readServiceProviderConfig">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readServiceProviderConfig" class="collapse" aria-labelledby="readServiceProviderConfig">
          <p>GET https://platform.ringcentral.com/scim/ServiceProviderConfig</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#searchViaGet2" aria-expanded="true" aria-controls="searchViaGet2">Search/List Users</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/searchViaGet2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="searchViaGet2" class="collapse" aria-labelledby="searchViaGet2">
          <p>GET https://platform.ringcentral.com/scim/v2/Users</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">count</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">page size</td>
            </tr>
<tr>
	      <td class="n">filter</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">only support 'userName' or 'email' filter expressions for now</td>
            </tr>
<tr>
	      <td class="n">startIndex</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">start index (1-based)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createUser2" aria-expanded="true" aria-controls="createUser2">Create User</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/createUser2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createUser2" class="collapse" aria-labelledby="createUser2">
          <p>POST https://platform.ringcentral.com/scim/v2/Users</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#searchViaGet" aria-expanded="true" aria-controls="searchViaGet">Search/List Users</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/searchViaGet">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="searchViaGet" class="collapse" aria-labelledby="searchViaGet">
          <p>GET https://platform.ringcentral.com/scim/Users</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">count</td>
	      <td class="t">integer</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de">page size</td>
            </tr>
<tr>
	      <td class="n">filter</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">only support 'userName' or 'email' filter expressions for now</td>
            </tr>
<tr>
	      <td class="n">startIndex</td>
	      <td class="t">integer</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de">start index (1-based)</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createUser" aria-expanded="true" aria-controls="createUser">Create User</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/createUser">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createUser" class="collapse" aria-labelledby="createUser">
          <p>POST https://platform.ringcentral.com/scim/Users</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#searchViaPost2" aria-expanded="true" aria-controls="searchViaPost2">Search/List Users</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/searchViaPost2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="searchViaPost2" class="collapse" aria-labelledby="searchViaPost2">
          <p>POST https://platform.ringcentral.com/scim/v2/Users/.search</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUser2" aria-expanded="true" aria-controls="readUser2">Get User</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/readUser2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUser2" class="collapse" aria-labelledby="readUser2">
          <p>GET https://platform.ringcentral.com/scim/v2/Users/{id}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#replaceUser2" aria-expanded="true" aria-controls="replaceUser2">Update/Replace User</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/replaceUser2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="replaceUser2" class="collapse" aria-labelledby="replaceUser2">
          <p>PUT https://platform.ringcentral.com/scim/v2/Users/{id}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">an existing user</td>
            </tr>
<tr>
	      <td class="n">id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">user id</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteUser2" aria-expanded="true" aria-controls="deleteUser2">Delete User</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/deleteUser2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteUser2" class="collapse" aria-labelledby="deleteUser2">
          <p>DELETE https://platform.ringcentral.com/scim/v2/Users/{id}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#patchUser2" aria-expanded="true" aria-controls="patchUser2">Update/Patch User</a> <a href="https://developers.ringcentral.com/api-reference/SCIM/patchUser2">#</a></td>
      <td class="description"></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="patchUser2" class="collapse" aria-labelledby="patchUser2">
          <p>PATCH https://platform.ringcentral.com/scim/v2/Users/{id}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">patch operations list</td>
            </tr>
<tr>
	      <td class="n">id</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">user id</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### SIP

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createSIPRegistration" aria-expanded="true" aria-controls="createSIPRegistration">Register SIP Device</a> <a href="https://developers.ringcentral.com/api-reference/SIP/createSIPRegistration">#</a></td>
      <td class="description"><p>Creates SIP registration of a device/application (WebPhone, Mobile, softphone)</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createSIPRegistration" class="collapse" aria-labelledby="createSIPRegistration">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/client-info/sip-provision</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### SMS

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createSMSMessage" aria-expanded="true" aria-controls="createSMSMessage">Send SMS</a> <a href="https://developers.ringcentral.com/api-reference/SMS/createSMSMessage">#</a></td>
      <td class="description"><p>Creates and sends a new text message. You can send SMS messages simultaneously to different recipients up to 40 requests per minute; this limitation is relevant for all client applications. Sending and receiving SMS is available for Toll-Free Numbers within the USA. You can send up to 10 attachments in one MMS message; the size of all attachments linked is limited to 1500000 bytes.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createSMSMessage" class="collapse" aria-labelledby="createSMSMessage">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/sms</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Subscriptions

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listSubscriptions" aria-expanded="true" aria-controls="listSubscriptions">Get Subscriptions</a> <a href="https://developers.ringcentral.com/api-reference/Subscriptions/listSubscriptions">#</a></td>
      <td class="description"><p>Returns a list of subscriptions created by a particular user on a particular client app.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listSubscriptions" class="collapse" aria-labelledby="listSubscriptions">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/subscription</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createSubscription" aria-expanded="true" aria-controls="createSubscription">Create Subscription</a> <a href="https://developers.ringcentral.com/api-reference/Subscriptions/createSubscription">#</a></td>
      <td class="description"><p>Creates a new subscription.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createSubscription" class="collapse" aria-labelledby="createSubscription">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/subscription</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readSubscription" aria-expanded="true" aria-controls="readSubscription">Get Subscription</a> <a href="https://developers.ringcentral.com/api-reference/Subscriptions/readSubscription">#</a></td>
      <td class="description"><p>Returns the requested subscription.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readSubscription" class="collapse" aria-labelledby="readSubscription">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateSubscription" aria-expanded="true" aria-controls="updateSubscription">Renew Subscription / Update Event Filters</a> <a href="https://developers.ringcentral.com/api-reference/Subscriptions/updateSubscription">#</a></td>
      <td class="description"><p>Renews the existent subscription if the request body is empty. If event filters are specified, calling this method modifies the event filters for the existing subscription. The client application can extend or narrow the events for which it receives notifications in the frame of one subscription.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateSubscription" class="collapse" aria-labelledby="updateSubscription">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">aggregated</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">If 'True' then aggregated presence status is returned in a notification payload</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">subscriptionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a subscription</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteSubscription" aria-expanded="true" aria-controls="deleteSubscription">Cancel Subscription</a> <a href="https://developers.ringcentral.com/api-reference/Subscriptions/deleteSubscription">#</a></td>
      <td class="description"><p>Cancels the existent subscription.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteSubscription" class="collapse" aria-labelledby="deleteSubscription">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#renewSubscription" aria-expanded="true" aria-controls="renewSubscription">Renew Subscription</a> <a href="https://developers.ringcentral.com/api-reference/Subscriptions/renewSubscription">#</a></td>
      <td class="description"><p>Renews an existent subscription by ID by posting request with an empty body.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="renewSubscription" class="collapse" aria-labelledby="renewSubscription">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/subscription/{subscriptionId}/renew</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### Tasks

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listChatTasks" aria-expanded="true" aria-controls="listChatTasks">Get Chat Tasks</a> <a href="https://developers.ringcentral.com/api-reference/Tasks/listChatTasks">#</a></td>
      <td class="description"><p>Returns the list of tasks of the specified chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listChatTasks" class="collapse" aria-labelledby="listChatTasks">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/tasks</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">assigneeId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a task assignee</td>
            </tr>
<tr>
	      <td class="n">assigneeStatus</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Task execution status by assignee(-s) specified in assigneeId</td>
            </tr>
<tr>
	      <td class="n">assignmentStatus</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Task assignment status</td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat</td>
            </tr>
<tr>
	      <td class="n">creationTimeFrom</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">The start datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2016-02-23T00:00:00</td>
            </tr>
<tr>
	      <td class="n">creationTimeTo</td>
	      <td class="t">string</td>
	      <td class="d">now</td>
	      <td class="r">False</td>
	      <td class="de">The end datetime for resulting records in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, e.g. 2019-03-10T18:23:45Z</td>
            </tr>
<tr>
	      <td class="n">creatorId</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a task creator</td>
            </tr>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Token of the current page. If token is omitted then the first page should be returned</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of records to be returned per screen</td>
            </tr>
<tr>
	      <td class="n">status</td>
	      <td class="t">array</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Task execution status</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createTask" aria-expanded="true" aria-controls="createTask">Create Task</a> <a href="https://developers.ringcentral.com/api-reference/Tasks/createTask">#</a></td>
      <td class="description"><p>Creates a task in the specified chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createTask" class="collapse" aria-labelledby="createTask">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/chats/{chatId}/tasks</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a chat</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readTask" aria-expanded="true" aria-controls="readTask">Get Task</a> <a href="https://developers.ringcentral.com/api-reference/Tasks/readTask">#</a></td>
      <td class="description"><p>Returns information about the specified task(s) by ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readTask" class="collapse" aria-labelledby="readTask">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#patchTask" aria-expanded="true" aria-controls="patchTask">Patch Task</a> <a href="https://developers.ringcentral.com/api-reference/Tasks/patchTask">#</a></td>
      <td class="description"><p>Updates the specified task by ID.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="patchTask" class="collapse" aria-labelledby="patchTask">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a task</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteTask" aria-expanded="true" aria-controls="deleteTask">Delete Task</a> <a href="https://developers.ringcentral.com/api-reference/Tasks/deleteTask">#</a></td>
      <td class="description"><p>Deletes the specified task.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteTask" class="collapse" aria-labelledby="deleteTask">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#completeTask" aria-expanded="true" aria-controls="completeTask">Complete Task</a> <a href="https://developers.ringcentral.com/api-reference/Tasks/completeTask">#</a></td>
      <td class="description"><p>Completes a task in the specified chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="completeTask" class="collapse" aria-labelledby="completeTask">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/tasks/{taskId}/complete</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">taskId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a task</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Teams

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listGlipTeams" aria-expanded="true" aria-controls="listGlipTeams">Get Teams</a> <a href="https://developers.ringcentral.com/api-reference/Teams/listGlipTeams">#</a></td>
      <td class="description"><p>Returns the list of teams where the user is a member (both archived and active) combined with a list of public teams that can be joined by the current user. All records in response are sorted by creation time of a chat in ascending order.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listGlipTeams" class="collapse" aria-labelledby="listGlipTeams">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/teams</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">pageToken</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Pagination token.</td>
            </tr>
<tr>
	      <td class="n">recordCount</td>
	      <td class="t">integer</td>
	      <td class="d">30</td>
	      <td class="r">False</td>
	      <td class="de">Number of teams to be fetched by one request. The maximum value is 250, by default - 30</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createGlipTeam" aria-expanded="true" aria-controls="createGlipTeam">Create Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/createGlipTeam">#</a></td>
      <td class="description"><p>Creates a team, and adds a list of people to the team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createGlipTeam" class="collapse" aria-labelledby="createGlipTeam">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipTeam" aria-expanded="true" aria-controls="readGlipTeam">Get Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/readGlipTeam">#</a></td>
      <td class="description"><p>Returns information about the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipTeam" class="collapse" aria-labelledby="readGlipTeam">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#patchGlipTeam" aria-expanded="true" aria-controls="patchGlipTeam">Update Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/patchGlipTeam">#</a></td>
      <td class="description"><p>Updates the name and description of the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="patchGlipTeam" class="collapse" aria-labelledby="patchGlipTeam">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a team to be updated.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteGlipTeam" aria-expanded="true" aria-controls="deleteGlipTeam">Delete Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/deleteGlipTeam">#</a></td>
      <td class="description"><p>Deletes the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteGlipTeam" class="collapse" aria-labelledby="deleteGlipTeam">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#joinGlipTeam" aria-expanded="true" aria-controls="joinGlipTeam">Join Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/joinGlipTeam">#</a></td>
      <td class="description"><p>Adds the current user to the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="joinGlipTeam" class="collapse" aria-labelledby="joinGlipTeam">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/join</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#leaveGlipTeam" aria-expanded="true" aria-controls="leaveGlipTeam">Leave Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/leaveGlipTeam">#</a></td>
      <td class="description"><p>Removes the current user from the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="leaveGlipTeam" class="collapse" aria-labelledby="leaveGlipTeam">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/leave</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#addGlipTeamMembers" aria-expanded="true" aria-controls="addGlipTeamMembers">Add Team Members</a> <a href="https://developers.ringcentral.com/api-reference/Teams/addGlipTeamMembers">#</a></td>
      <td class="description"><p>Adds members to the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="addGlipTeamMembers" class="collapse" aria-labelledby="addGlipTeamMembers">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/add</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a team to add members to.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#removeGlipTeamMembers" aria-expanded="true" aria-controls="removeGlipTeamMembers">Remove Team Members</a> <a href="https://developers.ringcentral.com/api-reference/Teams/removeGlipTeamMembers">#</a></td>
      <td class="description"><p>Removes members from the specified team.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="removeGlipTeamMembers" class="collapse" aria-labelledby="removeGlipTeamMembers">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/remove</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">chatId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a team to remove members from.</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#archiveGlipTeam" aria-expanded="true" aria-controls="archiveGlipTeam">Archive Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/archiveGlipTeam">#</a></td>
      <td class="description"><p>Changes the status of the specified team to 'Archived'.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="archiveGlipTeam" class="collapse" aria-labelledby="archiveGlipTeam">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/archive</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#unarchiveGlipTeam" aria-expanded="true" aria-controls="unarchiveGlipTeam">Unarchive Team</a> <a href="https://developers.ringcentral.com/api-reference/Teams/unarchiveGlipTeam">#</a></td>
      <td class="description"><p>Changes the status of the specified team to 'Active'.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="unarchiveGlipTeam" class="collapse" aria-labelledby="unarchiveGlipTeam">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/glip/teams/{chatId}/unarchive</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readGlipEveryone" aria-expanded="true" aria-controls="readGlipEveryone">Get Everyone Chat</a> <a href="https://developers.ringcentral.com/api-reference/Teams/readGlipEveryone">#</a></td>
      <td class="description"><p>Returns information about Everyone chat.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readGlipEveryone" class="collapse" aria-labelledby="readGlipEveryone">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/glip/everyone</p>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#patchGlipEveryone" aria-expanded="true" aria-controls="patchGlipEveryone">Update Everyone Сhat</a> <a href="https://developers.ringcentral.com/api-reference/Teams/patchGlipEveryone">#</a></td>
      <td class="description"><p>Updates Everyone chat information.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="patchGlipEveryone" class="collapse" aria-labelledby="patchGlipEveryone">
          <p>PATCH https://platform.ringcentral.com/restapi/v1.0/glip/everyone</p>
</div>
      </td>
    </tr>
</tbody>
</table>

### User Permissions

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readAuthorizationProfile" aria-expanded="true" aria-controls="readAuthorizationProfile">Get Authorization Profile</a> <a href="https://developers.ringcentral.com/api-reference/User-Permissions/readAuthorizationProfile">#</a></td>
      <td class="description"><p>Returns a list of user permissions granted at authorization procedure. Please note: Some permissions may be restricted by extension type.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readAuthorizationProfile" class="collapse" aria-labelledby="readAuthorizationProfile">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/authz-profile</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#checkUserPermission" aria-expanded="true" aria-controls="checkUserPermission">Check User Permission</a> <a href="https://developers.ringcentral.com/api-reference/User-Permissions/checkUserPermission">#</a></td>
      <td class="description"><p>Checks if a certain user permission is activated for a particular extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="checkUserPermission" class="collapse" aria-labelledby="checkUserPermission">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/authz-profile/check</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">permissionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">targetExtensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### User Settings

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readExtension" aria-expanded="true" aria-controls="readExtension">Get Extension</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/readExtension">#</a></td>
      <td class="description"><p>Returns basic information about a particular extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readExtension" class="collapse" aria-labelledby="readExtension">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateExtension" aria-expanded="true" aria-controls="updateExtension">Update Extension</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/updateExtension">#</a></td>
      <td class="description"><p>Updates user settings.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateExtension" class="collapse" aria-labelledby="updateExtension">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#deleteExtension" aria-expanded="true" aria-controls="deleteExtension">Delete Extension</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/deleteExtension">#</a></td>
      <td class="description"><p>Deletes extension(s) by ID(s).</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="deleteExtension" class="collapse" aria-labelledby="deleteExtension">
          <p>DELETE https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">savePhoneLines</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">savePhoneNumbers</td>
	      <td class="t">boolean</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readExtensionCallerId" aria-expanded="true" aria-controls="readExtensionCallerId">Get Extension Caller ID</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/readExtensionCallerId">#</a></td>
      <td class="description"><p>Returns information on an outbound caller ID of an extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readExtensionCallerId" class="collapse" aria-labelledby="readExtensionCallerId">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-id</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateExtensionCallerId" aria-expanded="true" aria-controls="updateExtensionCallerId">Update Extension Caller ID</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/updateExtensionCallerId">#</a></td>
      <td class="description"><p>Updates outbound caller ID information of an extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateExtensionCallerId" class="collapse" aria-labelledby="updateExtensionCallerId">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/caller-id</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#listExtensionGrants" aria-expanded="true" aria-controls="listExtensionGrants">Get Extension Grant List</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/listExtensionGrants">#</a></td>
      <td class="description"><p>Returns the list of extensions with the information on grants given to the current extension regarding them. Currently the list of grants include: picking up a call, monitoring, calling or receiving a call on behalf of somebody, call delegation and calling paging groups.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="listExtensionGrants" class="collapse" aria-labelledby="listExtensionGrants">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/grant</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionType</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Type of extension to be returned. Multiple values are supported</td>
            </tr>
<tr>
	      <td class="n">page</td>
	      <td class="t">string</td>
	      <td class="d">1</td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">perPage</td>
	      <td class="t">string</td>
	      <td class="d">100</td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readNotificationSettings" aria-expanded="true" aria-controls="readNotificationSettings">Get Notification Settings</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/readNotificationSettings">#</a></td>
      <td class="description"><p>Returns notification settings for the current extension.
 <p>Knowledge Article: <a href="https://success.ringcentral.com/articles/RC_Knowledge_Article/9740">User Settings - Set up Message Notifications</a></p></p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readNotificationSettings" class="collapse" aria-labelledby="readNotificationSettings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/notification-settings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateNotificationSettings" aria-expanded="true" aria-controls="updateNotificationSettings">Update Notification Settings</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/updateNotificationSettings">#</a></td>
      <td class="description"><p>Updates notification settings for the current extension.
<p>Knowledge Article: <a href="https://success.ringcentral.com/articles/RC_Knowledge_Article/9740">User Settings - Set up Message Notifications</a></p></p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateNotificationSettings" class="collapse" aria-labelledby="updateNotificationSettings">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/notification-settings</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">integer</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserProfileImage" aria-expanded="true" aria-controls="readUserProfileImage">Get User Profile Image</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/readUserProfileImage">#</a></td>
      <td class="description"><p>Returns a profile image of an extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserProfileImage" class="collapse" aria-labelledby="readUserProfileImage">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#createUserProfileImage" aria-expanded="true" aria-controls="createUserProfileImage">Upload User Profile Image</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/createUserProfileImage">#</a></td>
      <td class="description"><p>Uploads the extension profile image.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="createUserProfileImage" class="collapse" aria-labelledby="createUserProfileImage">
          <p>POST https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">image</td>
	      <td class="t">file</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateUserProfileImage" aria-expanded="true" aria-controls="updateUserProfileImage">Update User Profile Image</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/updateUserProfileImage">#</a></td>
      <td class="description"><p>Updates the extension profile image</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateUserProfileImage" class="collapse" aria-labelledby="updateUserProfileImage">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">image</td>
	      <td class="t">file</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de"></td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readScaledPofileImage" aria-expanded="true" aria-controls="readScaledPofileImage">Get Scaled User Profile Image</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/readScaledPofileImage">#</a></td>
      <td class="description"><p>Returns scaled profile image of an extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readScaledPofileImage" class="collapse" aria-labelledby="readScaledPofileImage">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/profile-image/{scaleSize}</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">scaleSize</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">Dimensions of a profile image which will be returned in response. If this path parameter is not specified in request URI then</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readConferencingSettings" aria-expanded="true" aria-controls="readConferencingSettings">Get User Conferencing Settings</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/readConferencingSettings">#</a></td>
      <td class="description"><p>Returns the information on the Free Conference Calling (FCC) feature for a given extension.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readConferencingSettings" class="collapse" aria-labelledby="readConferencingSettings">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/conferencing</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">countryId</td>
	      <td class="t">string</td>
	      <td class="d"></td>
	      <td class="r">False</td>
	      <td class="de">Internal identifier of a country. If not specified, the response is returned for the brand country</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateConferencingSettings" aria-expanded="true" aria-controls="updateConferencingSettings">Update User Conferencing Settings</a> <a href="https://developers.ringcentral.com/api-reference/User-Settings/updateConferencingSettings">#</a></td>
      <td class="description"><p>Updates the default conferencing number for the current extension. The number can be selected from conferencing numbers of the current extension. Updates the setting, allowing participants join the conference before host.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateConferencingSettings" class="collapse" aria-labelledby="updateConferencingSettings">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/conferencing</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de">JSON body</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the account logged-in within the current session</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>

### Video Configuration

<table class="table api-index">
  <thead>
    <tr>
      <th scope="col">Method</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#readUserVideoConfiguration" aria-expanded="true" aria-controls="readUserVideoConfiguration">Get User Video Configuration</a> <a href="https://developers.ringcentral.com/api-reference/Video-Configuration/readUserVideoConfiguration">#</a></td>
      <td class="description"><p>Returns information about video configuration of the current user.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="readUserVideoConfiguration" class="collapse" aria-labelledby="readUserVideoConfiguration">
          <p>GET https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/video-configuration</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the current session account</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
<tr>
      <td class="method"><a href="#" data-toggle="collapse" data-target="#updateUserVideoConfiguration" aria-expanded="true" aria-controls="updateUserVideoConfiguration">Update User Video Configuration</a> <a href="https://developers.ringcentral.com/api-reference/Video-Configuration/updateUserVideoConfiguration">#</a></td>
      <td class="description"><p>Allows to update user video settings, for example video provider.</p></p></td>
    </tr>
    <tr>
      <td class="endpoint" colspan="2">
	<div id="updateUserVideoConfiguration" class="collapse" aria-labelledby="updateUserVideoConfiguration">
          <p>PUT https://platform.ringcentral.com/restapi/v1.0/account/{accountId}/extension/{extensionId}/video-configuration</p>

	  <table class="table api-index">
	    <thead>
	      <tr>
	        <th scope="col">Name</th>
		<th scope="col">Type</th>
		<th scope="col">Default</th>
		<th scope="col">Required</th>
		<th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
<tr>
	      <td class="n">accountId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of a RingCentral account or tilde (~) to indicate the account logged-in within the current session</td>
            </tr>
<tr>
	      <td class="n">body</td>
	      <td class="t"></td>
	      <td class="d"></td>
	      <td class="r">True</td>
	      <td class="de"></td>
            </tr>
<tr>
	      <td class="n">extensionId</td>
	      <td class="t">string</td>
	      <td class="d">~</td>
	      <td class="r">True</td>
	      <td class="de">Internal identifier of an extension or tilde (~) to indicate the extension assigned to the current session account</td>
            </tr>
</tbody>
          </table>
</div>
      </td>
    </tr>
</tbody>
</table>
