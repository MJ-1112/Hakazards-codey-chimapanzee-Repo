
import {PrivyProvider} from '@privy-io/react-auth';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId="cm9meja7002hfl40m9wgit9g3"
      clientId="WY5ivNLubf9VhV56jxRptE3Hb1WXjwBRd7qBRtMn1CbK5"
      config={{
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: 'users-without-wallets'
        }
      }}
    >
      {children}
    </PrivyProvider>
  );
}