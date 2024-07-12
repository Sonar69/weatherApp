// function create video
function createVideo(id, src, alt) {
    // creer la video et l'ajouter au body
    let video = document.createElement('video');
    video.setAttribute('id', id);
    video.setAttribute('src', src);
    video.setAttribute('alt', alt);
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    document.body.appendChild(video);
}

// Fonction pour masquer toutes les vidéos
function hideAllVideos() {
    document.querySelectorAll('video').forEach(video => {
        video.hidden = true;
        video.removeAttribute('autoplay'); // stop
        video.removeAttribute('muted'); // stop
        video.removeAttribute('loop'); // stop
    });
}

// Fonction pour afficher une vidéo spécifique
function showVideo(videoId) {
    // console.log('JE SUIS VIDEO')
    hideAllVideos(); // Masquer toutes les vidéos d'abord
    document.getElementById(videoId).hidden = false; // Afficher la vidéo spécifiée
    document.getElementById(videoId).setAttribute('autoplay', ''); // play
    document.getElementById(videoId).setAttribute('muted', ''); // play
    document.getElementById(videoId).setAttribute('loop', ''); // play
}

// switch weather code
export async function weatherCode(code, bool) {
    // console.log('CODE => ' + code)
    let func = (nameVideo) => {
        if (bool) {
            showVideo(nameVideo)
        }
    }
    let description
    switch (code) {
        case 0:
            description = 'Ciel dégagé';
            func('video-sun') // afficher une vidéo spécifique
            break;
        case 1:
            description = 'Principalement dégagé';
            func('video-sun') // afficher une vidéo spécifique
            break;
        case 2:
            description = 'Partiellement nuageux';
            func('video-cloud-little') // afficher une vidéo spécifique
            break;
        case 3:
            description = 'Couvert';
            func('video-cloud') // afficher une vidéo spécifique
            break;
        case 45:
            description = 'Brouillard';
            func('video-cloud') // afficher une vidéo spécifique
            break;
        case 48:
            description = 'Brouillard givrant';
            func('video-cloud') // afficher une vidéo spécifique
            break;
        case 51:
            description = 'Bruine : Légère';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 53:
            description = 'Bruine : Modérée';
            func('video-rain-little') // afficher une vidéo spécifique
            break;
        case 55:
            description = 'Bruine : Forte intensité';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 56:
            description = 'Bruine verglaçante : Légère';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 57:
            description = 'Bruine verglaçante : Forte intensité';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 61:
            description = 'Pluie : Faible';
            func('video-rain-little') // afficher une vidéo spécifique
            break;
        case 63:
            description = 'Pluie : Modérée';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 65:
            description = 'Pluie : Forte intensité';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 66:
            description = 'Pluie verglaçante : Légère';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 67:
            description = 'Pluie verglaçante : Forte intensité';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 71:
            description = 'Chute de neige : Légère intensité';
            func('video-snow') // afficher une vidéo spécifique
            break;
        case 73:
            description = 'Chute de neige : Intensité modérée';
            func('video-snow-little') // afficher une vidéo spécifique
            break;
        case 75:
            description = 'Chute de neige : Intensité forte';
            func('video-snow-little') // afficher une vidéo spécifique
            break;
        case 77:
            description = 'Grains de neige';
            func('video-snow-little') // afficher une vidéo spécifique
            break;
        case 80:
            description = 'Averses de pluie : Légères';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 81:
            description = 'Averses de pluie : Modérées';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 82:
            description = 'Averses de pluie : Violentes';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 85:
            description = 'Averses de neige : Légères';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 86:
            description = 'Averses de neige : Fortes';
            func('video-rain') // afficher une vidéo spécifique
            break;
        case 95:
            description = 'Orage : Léger ou modéré';
            func('video-thunderstorm') // afficher une vidéo spécifique
            break;
        case 96:
            description = 'Orage avec légères précipitations';
            func('video-thunderstorm') // afficher une vidéo spécifique
            break;
        case 99:
            description = 'Orage avec fortes précipitations de grêle';
            func('video-thunderstorm') // afficher une vidéo spécifique
            break;
        default:
            console.log('Error: Non definit');
            return;
    }
    // console.log('Description :' + description)
    return description
}