import Blockies from 'react-blockies'

interface IdenticonProps {
    account: string
    scale?: number
}

export default function Identicon({ account, scale = 4 }: IdenticonProps) {
  return (
    <Blockies
      seed={account.toLowerCase()}
      size={8}
      scale={scale}
      className="identicon rounded-full"
    />
  )
}
