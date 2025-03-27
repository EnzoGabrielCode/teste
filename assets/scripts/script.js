document.addEventListener("DOMContentLoaded", function () {
    const imgElement = document.getElementById("versiculo-img");
    const downloadBtn = document.getElementById("download-btn");
    const whatsappBtn = document.getElementById("whatsapp-btn");
    const shareBtn = document.getElementById("share-btn");
    
    if (imgElement && downloadBtn && whatsappBtn ) {
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        const imagePath = `./assets/img/versiculos/${randomNumber}.png`;
        
        imgElement.src = imagePath;
        downloadBtn.href = imagePath;
        
        whatsappBtn.addEventListener("click", function (event) {
            event.preventDefault();
            fetch(imagePath)
                .then(response => response.blob())
                .then(blob => {
                    const file = new File([blob], "versiculo.png", { type: blob.type });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    
                    if (navigator.canShare && navigator.canShare({ files: [file] })) {
                        navigator.share({ files: [file] })
                            .catch(error => console.log("Erro ao compartilhar no WhatsApp", error));
                    } else {
                        window.open(`https://api.whatsapp.com/send?text=Confira esta imagem!`, '_blank');
                    }
                })
                .catch(error => console.log("Erro ao buscar imagem para compartilhar", error));
        });
        
        if (navigator.canShare) {
            shareBtn.addEventListener("click", function () {
                fetch(imagePath)
                    .then(response => response.blob())
                    .then(blob => {
                        const file = new File([blob], "versiculo.png", { type: blob.type });
                        
                        if (navigator.canShare({ files: [file] })) {
                            navigator.share({ files: [file] });
                        } else {
                            console.log("Compartilhamento de arquivos não suportado.");
                        }
                    })
                    .catch(error => console.log("Erro ao compartilhar a imagem", error));
            });
        } else {
            shareBtn.style.display = "none";
        }
    }
});