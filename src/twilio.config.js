import { connect, createLocalVideoTrack } from 'twilio-video';

createLocalVideoTrack().then(localtrack => {
  const localMediaContainer = document.getElementById('local-media');
  localMediaContainer.appendChild(localtrack.attach());

/**
 * calling out nodejs server and getting access token
 */
fetch(`http://localhost:3001/getToken`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    connect(data.accessToken, { name:'my-new-room'  }).then(room => {
      console.log(`Successfully joined a Room: ${room}`);

      // For loading all the existing participants in the room
      room.participants.forEach(participant => {
        participant.tracks.forEach(publication => {
          if (publication.track) {
            document.getElementById('remote-media-div').appendChild(publication.track.attach());
          }
        });
      
       participant.on('trackSubscribed', track => {
          document.getElementById('remote-media-div').appendChild(track.attach());
        });
      });
      
      // to add when new particpant connect the room
      room.on('participantConnected', participant => {
        console.log(`Participant "${participant.identity}" connected`);
      
        participant.on('trackSubscribed', track => {
          console.log('track listner')
          document.getElementById('remote-media-div').appendChild(track.attach());
        });
      });

    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    });
  });
});