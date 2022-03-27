import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon, CloudUploadIcon } from "@heroicons/react/solid";
import uploadToIPFS from "../../services/nftStorage";
import { ExportToIPFS, UploadAsset } from "../../services/livePeer";
import Link from "next/link";

export default function Modal(props) {
    //const [open, setOpen] = useState(false);
    const { open, onClose } = props;
    const [loadedProgress, setProgress] = useState(0)
    const [status, setStatus] = useState("")
    const [ipfsCID, setIpfsCID] = useState("")

    const statusList = ["uploading", "processing", "exporting", "finished"]

    const handleFile = (e) => {
        const file = e.target.files[0]
        if (!file) return alert("invalid file!")
        console.log(file)
        const fileReader = new FileReader()
        fileReader.onload = async () => {
            const MB = 1000000;
            const LIMIT_SIZE = 100 * MB
            const blob = new Blob([fileReader.result], {
                // This will set the mimetype of the file
                type: file.type
            });
            const blobName = file.name;
            if (blob.size > LIMIT_SIZE) return new Error('File size is to big!');

            setStatus("uploading")
            const asset = await UploadAsset(file, blobName, (progress) => setProgress(progress), () => setStatus("processing"))
            setStatus("exporting")
            const ipfs = await ExportToIPFS(asset.id, (progress) => setProgress(progress))
            console.log(ipfs)
            setIpfsCID(ipfs.nftMetadataCid)
            setStatus("finished")
            setProgress(1)
        }
        fileReader.readAsArrayBuffer(file)
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={onClose}
            >
                <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className='hidden sm:inline-block sm:align-middle sm:h-screen'
                        aria-hidden='true'
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div className='inline-block align-bottom bg-secondary-color text-white rounded-lg px-4 pt-24 pb-16 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:w-1/3' style={{
                            backgroundImage: 'url(/assets/ellipse-bg.svg)',
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }}>

                            <div className="absolute top-0 right-0 p-3 font-medium text-2xl text-white hover:text-red-500 cursor-pointer" onClick={() => onClose(false)}>
                                X
                            </div>

                            <div>
                                <div className='mx-auto flex items-center justify-center'>
                                    <CloudUploadIcon
                                        className='w-16 text-white solid-fill'
                                        aria-hidden='true'
                                    />
                                </div>
                                <div className='mt-8 text-center'>
                                    {
                                        !status &&
                                        <Dialog.Title
                                            as='h3'
                                            className='text-2xl leading-6 font-medium'
                                        >
                                            Drag and drop files to Upload
                                            <div className="mt-4">
                                                or
                                            </div>
                                        </Dialog.Title>
                                    }
                                </div>
                            </div>
                            <div className='mx-auto flex flex-wrap items-center justify-center mt-6'>
                                <div className="w-full text-center flex flex-wrap py-4">
                                    {
                                        statusList.indexOf(status) > statusList.indexOf("uploading") && <li className="w-full flex justify-center space-x-2"><span>Uploaded</span> <CheckCircleIcon className="w-4" /> </li>
                                    }
                                    {
                                        statusList.indexOf(status) > statusList.indexOf("processing") && <li className="w-full flex justify-center space-x-2"><span>Processed</span> <CheckCircleIcon className="w-4" /> </li>
                                    }
                                    {
                                        statusList.indexOf(status) > statusList.indexOf("exporting") && <li className="w-full flex justify-center space-x-2"><span>Exported to IPFS</span> <CheckCircleIcon className="w-4" /> </li>
                                    }
                                    {
                                        statusList.indexOf(status) == statusList.indexOf("finished") && <li className="w-full flex justify-center space-x-2"><span>Finished!</span> <CheckCircleIcon className="w-4" /> </li>
                                    }
                                    {status && status != "finished" && <li className="w-full flex justify-center space-x-2 items-center">
                                        <span>{status == "exporting" ? "exporting to IPFS" : status}</span>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </li>}
                                </div>
                                {
                                    ipfsCID
                                        ? <Link href={`/watch/${ipfsCID}`}>
                                        <a> 
                                        <div
                                            className='relative inline-flex justify-center items-center w-48 h-8 rounded-md border border-special-color shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-special-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm hover:cursor-pointer'
                                        >Open Video</div>
                                        </a>
                                        </Link>
                                        : <label htmlFor="video-upload">
                                            <div
                                                className='relative inline-flex justify-center w-48 h-8 rounded-md border border-special-color shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm hover:cursor-pointer'
                                            >
                                                <div className="bg-special-color absolute top-0 left-0 h-full rounded-md" style={{
                                                    width: `${100 * loadedProgress}%`
                                                }}></div>
                                                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                                                    {
                                                        loadedProgress
                                                            ? `${100 * loadedProgress | 0}%`
                                                            : 'Choose a File'
                                                    }
                                                </div>
                                            </div>
                                            <input id="video-upload" className="hidden" onChange={handleFile} type="file" />
                                        </label>
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}