const fs = require('fs')
const { RTCAudioSink } = require('wrtc').nonstandard
const Softphone = require('ringcentral-softphone').default

var supervisorDeviceId = ""
var channels = []

async function initializePhoneEngine(rcsdk){
  var softphone = new Softphone(rcsdk)
  try {
      await softphone.register()
      supervisorDeviceId = softphone.device.id
      console.log("supervisorDeviceId", supervisorDeviceId)
      console.log("Supervisor Ready!")

      softphone.on('INVITE', sipMessage => {
        var headers = sipMessage.headers['p-rc-api-ids'].split(";")
        if (sipMessage.headers['p-rc-api-monitoring-ids']){
          headers = sipMessage.headers['p-rc-api-monitoring-ids'].split(";")
        }

        var partyId = headers[0].split("=")[1]
        var channelIndex = 0
        if (channels.length > 0){
          var found = false
          for (channelIndex=0; channelIndex<this.channels.length; channelIndex++){
            if (this.channels[channelIndex].partyId == partyId){
              this.channels[channelIndex].callId = sipMessage.headers['Call-Id']
              this.softphone.answer(sipMessage)
              console.log("Recording ...")
              found = true
              break
            }
          }
          if (found == false){
            channelIndex = this.setChannel(partyId)
            this.channels[channelIndex].callId = sipMessage.headers['Call-Id']
            this.softphone.answer(sipMessage)
            console.log("Recording ...", channelIndex)
          }
        }else{
          var date = new Date().toISOString()
          date = date.replace(/\//g, "-")
          var audioPath =  `${partyId}.raw`
          var channel = {
            partyId : partyId,
            callId: sipMessage.headers['Call-Id'],
            audioStream: fs.createWriteStream(audioPath, { flags: 'a' }),
            audioSink: null
          }

          this.setChannel(partyId)
          this.channels[channelIndex].callId = sipMessage.headers['Call-Id']
          this.softphone.answer(sipMessage)
          console.log("Recording ...", channelIndex)
        }

        softphone.once('track', e => {
          channels[channelIndex].audioSink = new RTCAudioSink(e.track)
          channels[channelIndex].audioSink.ondata = data => {
            if (channels[channelIndex] != undefined)
                channels[channelIndex].audioStream.write(Buffer.from(data.samples.buffer))
          }
        })
    })
    this.softphone.on('BYE', sipMessage => {
      console.log("RECEIVE BYE MESSAGE => Hanged up now")
      console.log("Stop recording!")
      var i = 0
      for (i=0; i<this.channels.length; i++){
        var agent = this.channels[i]
        if (agent.callId == sipMessage.headers['Call-Id']){
          console.log(`Call callId: ${agent.callId}`)
          console.log(`Call party id: ${this.channels[i].partyId}`)
          this.channels[i].audioSink.stop()
          this.channels[i].audioSink = null
          this.channels[i].audioStream.end()
          this.channels[i].audioStream.close()
          this.channels[i].audioStream = null
          this.channels.splice(i, 1)
          break
        }
      }
    })
  }catch(e){
    console.log("FAILED REGISTER?")
    console.log(e)
  }
}
  initializePhoneEngine: async function(rcsdk){
    if (this.softphone){
      console.log("Has been initialized")
      return
    }
    this.softphone = new Softphone(rcsdk)
    try {
        console.log("CREATE SP REGISTER?")
        await this.softphone.register()
        this.deviceId = this.softphone.device.id
        console.log(this.deviceId)
        console.log("Supervisor Ready!")

        this.softphone.on('INVITE', sipMessage => {
          console.log("SIP Invite")

          var headers = sipMessage.headers['p-rc-api-ids'].split(";")
          if (sipMessage.headers['p-rc-api-monitoring-ids']){
            console.log("p-rc-api-monitoring-ids ", sipMessage.headers['p-rc-api-monitoring-ids'])
            headers = sipMessage.headers['p-rc-api-monitoring-ids'].split(";")
          }

          var partyId = headers[0].split("=")[1]
          var channelIndex = 0
          if (this.channels.length > 0){
            var found = false
            for (channelIndex=0; channelIndex<this.channels.length; channelIndex++){
              if (this.channels[channelIndex].partyId == partyId){
                this.channels[channelIndex].callId = sipMessage.headers['Call-Id']
                this.softphone.answer(sipMessage)
                console.log("Recording ...")
                found = true
                break
              }
            }
            if (found == false){
              channelIndex = this.setChannel(partyId)
              this.channels[channelIndex].callId = sipMessage.headers['Call-Id']
              this.softphone.answer(sipMessage)
              console.log("Recording ...", channelIndex)
            }
          }else{
            this.setChannel(partyId)
            this.channels[channelIndex].callId = sipMessage.headers['Call-Id']
            this.softphone.answer(sipMessage)
            console.log("Recording ...", channelIndex)
          }

          this.softphone.once('track', e => {
            this.channels[channelIndex].audioSink = new RTCAudioSink(e.track)
            this.channels[channelIndex].audioSink.ondata = data => {
              if (this.channels[channelIndex] != undefined)
                this.channels[channelIndex].audioStream.write(Buffer.from(data.samples.buffer))
                /*
                if (speaker === null) {
                  // wait until sample rate stable
                  if (data.sampleRate === prevSampleRate) {
                      speaker = new Speaker({
  	                			channels: data.channelCount,
                          bitDepth: data.bitsPerSample,
                          sampleRate: data.sampleRate,
                          signed: true
  		    						})
                  }
                  prevSampleRate = data.sampleRate
                }else
                 speaker.write(Buffer.from(data.samples.buffer))
                */
            }
          })
      })
      this.softphone.on('BYE', sipMessage => {
        console.log("RECEIVE BYE MESSAGE => Hanged up now")
        console.log("Stop recording!")
        var i = 0
        for (i=0; i<this.channels.length; i++){
          var agent = this.channels[i]
          if (agent.callId == sipMessage.headers['Call-Id']){
            console.log(`Call callId: ${agent.callId}`)
            console.log(`Call party id: ${this.channels[i].partyId}`)
            this.channels[i].audioSink.stop()
            this.channels[i].audioSink = null
            this.channels[i].audioStream.end()
            this.channels[i].audioStream.close()
            this.channels[i].audioStream = null
            this.channels.splice(i, 1)
            break
          }
        }
      })
    }catch(e){
      console.log("FAILED REGISTER?")
      console.log(e)
    }
  },
  setChannel: function (partyId){
    var date = new Date().toISOString()
    date = date.replace(/\//g, "-")
    var audioPath =  `${partyId}.raw`

    if (fs.existsSync(audioPath)) {
        fs.unlinkSync(audioPath)
    }
    var channel = {
      partyId : partyId,
      callId: "",
      audioStream: fs.createWriteStream(audioPath, { flags: 'a' }),
      audioSink: null
    }
    this.channels.push(channel)
    return this.channels.length - 1
  },
  getChannel: function(partyId){
    var channel = this.channels.find(o => o.partyId === partyId)
    return channel
  },
  removeChannel: function(partyId){
    var channelIndex = this.channels.findIndex(o => o.partyId === partyId)
    if (channelIndex >= 0){
      this.channels.splice(channelIndex, 1)
      console.log("channel removed")
    }
  }
}
