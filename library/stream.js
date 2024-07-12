navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(stream => {
        // Utiliser le flux de la caméra/microphone
        console.log('Accès accordé au flux média:', stream);
    })
    .catch(error => {
        console.error('Erreur d\'accès:', error);
    });