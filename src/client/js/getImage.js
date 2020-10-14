import { text } from "body-parser";



function generateImage(){
    const pixUrl = 'https://pixabay.com/api/?'
    const pixKey = 'key=17177671-6b6705bca431b93a426874272&q=';
    let city = encodeURIComponent(document.getElementById('location').value)
    getTheImage(pixUrl, pixKey, city)
    return 
}

const getTheImage = async (pixUrl, pixKey, city) => {
    const res = await fetch(pixUrl + pixKey + city);
    try{
      const image = await res.json();
      console.log(image);
      Client.postData('/image',
       {imageUrl : image.hits[0].largeImageURL
      }).then(res => {
        console.log(res);
        document.getElementById('pixImage').setAttribute('src', image.hits[0].largeImageURL)
        // written with help from stackoverflow
        function toDataURL(src, callback, outputFormat) {
          var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
          };
          img.src = src;
          if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
          }
        }
        toDataURL(
          `${image.hits[0].largeImageURL}`,
          function(dataUrl) {
            const docDefinition = {
                        content: [
                            { 
                                alignment: 'center',
                                text: `This is your trip to ${city}`,
                                style: 'firstStyle',
                            },
                            {
                                text: `You're going on the ${tripDateGlobal.getMonth()}/${tripDateGlobal.getDate()}/${tripDateGlobal.getFullYear()} to the ${endDateGlobal.getMonth()}/${endDateGlobal.getDate()}/${endDateGlobal.getFullYear()} for ${tripLengthGlobal} days !
                                
                                Get everything ready, you still have ${countDownGlobal} days!!`,
                                style: 'secondStyle' ,
                            },
                            {
                              image: dataUrl,
                              width: 500,
                              height: 300,
                            }
                              ] 
                              };
                              pdfMake.createPdf(docDefinition).open()
        
          }
        )
               
      })
      return image;
    }catch(error){
      console.log('error', error)
    }
  }

export {
    generateImage,
    getTheImage
}