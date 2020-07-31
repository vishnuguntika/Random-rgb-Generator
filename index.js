$(document).ready(function() {
  $("#button").click(function() {

    // Generates a random value between 0 and 255
    function randomNum() {
      return Math.floor(Math.random() * 256);
    }

    // Returns an array of 3 values for rgb
    function randomRGB() {
      var red = randomNum();
      var green = randomNum();
      var blue = randomNum();
      return [red,green,blue];
    }

    // Store an array of values for rgb
    var rgbVals = randomRGB();

    // Turn array into an rgb value
    var tempColor = "rgb(" + rgbVals[0] + ", " + rgbVals[1] + ", " + rgbVals[2] + ")";

    // Give rgb color to the background
    $("body").css("background-color",tempColor);

    // Give rgb color to the text of the button
    $(this).css("color",tempColor);

    // Show user the rgb color
    $("#color").text(tempColor);

    // Converts an rgb color to hsl and returns the complement of the rgb color in hsl format
    function invert(rgbArray) {
      var rojo = rgbArray[0] / 255;
      var verde = rgbArray[1] / 255;
      var azul = rgbArray[2] / 255;

      var hue = 0;
      var sat = 0;
      var light = 0;

      var min = Math.min(rojo,verde,azul);
      var max = Math.min(rojo,verde,azul);
      var delta = max - min;

      // Assign the Lightness
      light = (max + min) / 2;

      // Assign the Saturation
      if(delta !== 0) {
        if(light < 0.5) {
          sat = delta / (max + min);
        }
        else {
          sat = delta / (2 - max - min);
        }
      } // sat = 0 otherwise

      // Assign the Hue
      var deltaRed = ((max - rojo) / 6 ) + (delta / 2);
      var deltaGreen = ((max - verde) / 6 ) + (delta / 2);
      var deltaBlue = ((max - azul) / 6 ) + (delta / 2);

      if(rojo == max) {
        hue = deltaBlue - deltaGreen;
      }
      else if(verde == max) {
        hue = (1/3) + (deltaRed - deltaBlue);
      }
      else if(azul == max) {
        hue = (2/3) + (deltaGreen - deltaRed);
      }

      if(hue < 0) {
        hue++;
      }
      if(hue > 1) {
        hue--;
      } // The rgb input is now converted to hsl

      // This sets the complementary color
      hue = Math.abs(hue - 0.5);

      return [hue,sat,light];
   }

   // Convert an hsl value to a rgb value
   function hsl2rgb(hslArray) {
      var hue = hslArray[0];
      var sat = hslArray[1];
      var light = hslArray[2];

      var red = 0;
      var green = 0;
      var blue = 0;

      var x = 0;
      var y = 0;

     if(sat === 0) {
       red = light * 255;
       green = light * 255;
       blue = light * 255;
     }
     else {
       if(light < 0.5) {
         y = light * (sat + 1);
       }
       else {
         y = (light + sat) - (light * sat);
       }
       x = (2 * light) - y;

       red = 255 * hue2rgb(x,y,hue+(1/3));
       green = 255 * hue2rgb(x,y,hue);
       blue = 255 * hue2rgb(x,y,hue-(1/3));
     }

     function hue2rgb(val1,val2,valHue) {
       if(valHue < 0) {
         valHue++;
       }
       if(valHue > 1) {
         valHue--;
       }
       if( (6*valHue) < 1 ) {
         return (val1 + ((val2 - val1) * 6 * valHue));
       }
       if( (2*valHue) < 1 ) {
         return val2;
       }
       if( (3*valHue) < 2 ) {
         return (val1 + ((val2 - val1) * 6 * ((2/3) - valHue)));
       }
       return val1;
     }

     return [red,green,blue];
   }

   // Store the complement of our temp color
   var comp = hsl2rgb(invert(rgbVals));

   // Turn array into an rgb value
    var complement = "rgb(" + comp[0] + ", " + comp[1] + ", " + comp[2] + ")";

    // Assign background color of button to complementary color
    $(this).css("background-color",complement);
  });
});
