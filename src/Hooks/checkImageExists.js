import { useEffect, useState } from 'react'
import axios from 'axios'
import algorandLogo from '../assets/icons/algorandLogo.png'
import noAssetImage from '../assets/icons/noAssetImage.jpeg'

function useCheckImageExists(asset) {
    const [tinyManAssetImage, setTinyManAssetImage] = useState('')

    useEffect(() => {
        if ((asset?.id === 0) || !asset) {
            setTinyManAssetImage(algorandLogo) 

        } else {
            
            axios
                .get(`https://asa-list.tinyman.org/assets/${asset.id}/icon.png`)
                .then(res => {
                    if (res.headers['content-type'].includes('image')) {
                        setTinyManAssetImage(`https://asa-list.tinyman.org/assets/${asset.id}/icon.png`)
                    } else if (asset.image) {
                        setTinyManAssetImage(asset.image)
                    } else {
                        setTinyManAssetImage(noAssetImage)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [asset?.id, asset?.image])

    return {
        tinyManAssetImage
    }
}

export default useCheckImageExists