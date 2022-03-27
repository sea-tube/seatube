import React, { useEffect, useRef, useState } from "react";

const qrOptions = {
    width: 240,
    height: 240,
    type: "svg",
    "margin": 0,
    "qrOptions": {
        "typeNumber": "0",
        "mode": "Byte",
        "errorCorrectionLevel": "Q"
    },
    "imageOptions": {
        "hideBackgroundDots": true,
        "imageSize": 0.12,
        "margin": 3
    },
    "dotsOptions": {
        "type": "dots",
        "color": "#222",
        "gradient": null
    },
    "backgroundOptions": {
        "color": "#ffffff"
    },
    "dotsOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#6a1a4c",
            "color2": "#6a1a4c",
            "rotation": "0"
        }
    },
    "cornersSquareOptions": {
        "type": "extra-rounded",
        "color": "#222"
    },
    "cornersSquareOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "cornersDotOptions": {
        "type": "",
        "color": "#333"
    },
    "cornersDotOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "backgroundOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#ffffff",
            "color2": "#ffffff",
            "rotation": "0"
        }
    }
}

interface ICustomQRCode {
  data: string,
  image?: string
}

export default function CustomQRCode({ data, image } : ICustomQRCode ) {
  const [qrCode, setQrCode] = useState<any>(null);
  const ref = useRef<any>(null);

  // Import QRCodeStyling dynamically to avoid errors
  useEffect(() => {
    const initQrCodeStyling = async () => {
      console.log("Hereee")
      const QRCodeStyling: any = (await import('qr-code-styling')).default
      const qrCoded = new QRCodeStyling({
        ...qrOptions,
        data,
        image
      })
      setQrCode(qrCoded)
    }

    initQrCodeStyling()

  }, [image, data])

  useEffect(() => {
    if (qrCode) {
      console.log("and here")
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    if (qrCode) {
      qrCode.update({ data });
    }
  }, [qrCode, data]);

  return (
    <div className="QrCode">
      <div ref={ref} />
    </div>
  );
}