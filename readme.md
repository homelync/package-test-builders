# Package-integration-webhook

Package contains converters, transformers and processes to help with implementing webhooks.

## Contents

- `ConvertToCsv` - Convert from JSON to CSV
- `ConvertToXml` - Convert from JSON to XML
- `ConvertToKvp` - Convert from JSON to Key-value-pair
- `Transform` - Transform fields
- `ProcessMessage` - Transforms and Converts

## Guide to output transforms

Output transforms support both raw regex and also a simplified transform format.

Both simplified and raw are case SENSITIVE.

### Simplied

Definition: `source1`=`target1`&&`source2`=`target2`

- Simply map source to target.
- Seperate mappings with `&&`.

----

**Example:** 

OutputTransform: `eventTypeId`=`Event`&&`eventTypeDescription`=`Text`
OutputFormat: KVP
Input: `{eventTypeId: 'FIRE_ALARM', eventTypeDescription: 'House on fire'}`
Output: `Event=FIRE_ALARM|Text=House on Fire`

OutputTransform: `eventTypeId`=`Event`&&`eventTypeDescription`=`Text`
OutputFormat: JSON
Input: `{eventTypeId: 'FIRE_ALARM', eventTypeDescription: 'House on fire'}`
Output: `{Event: 'FIRE_ALARM', Text: 'House on fire'}`


### Raw regex

This is really powerful but classically fiddly and easy to get wrong.

Definition: `source1`=`namedCaptureGroup1`&&`source2`=`namedCaptureGroup2`

- Each output field needs to be a named capture group e.g. `<OutputName>`.
- Each output field is a self contained regex seperated with `&&`
- The simplified format actually translates to the underlying regex below but raw regex is include for future extensibility. 

OutputTransform: `/(eventTypeId=+(?<Event>((.)[^\|]*)))&&(externalEventTypeId=+(?<Zone>((.)[^\|]*)))&&(eventTypeDescription=+(?<Text>((.)[^\|]*)))&&(propertyReference=+(?<DeviceAddress>((.)[^\|]*)))/`
OutputFormat: KVP
Input: `{eventTypeId: 'FIRE_ALARM', eventTypeDescription: 'House on fire'}`
Output: `Event=FIRE_ALARM|Text=House on Fire`

OutputTransform: `/(eventTypeId=+(?<Event>((.)[^\|]*)))&&(externalEventTypeId=+(?<Zone>((.)[^\|]*)))&&(eventTypeDescription=+(?<Text>((.)[^\|]*)))&&(propertyReference=+(?<DeviceAddress>((.)[^\|]*)))/`
OutputFormat: JSON
Input: `{eventTypeId: 'FIRE_ALARM', eventTypeDescription: 'House on fire'}`
Output: `{Event: 'FIRE_ALARM', Text: 'House on fire'}`