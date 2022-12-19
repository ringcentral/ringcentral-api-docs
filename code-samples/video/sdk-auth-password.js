import React, { useEffect, useState } from 'react';

export default function App({ config }) {
    useEffect(() => {
        const initRingCentralSdk = () => {
            const { clientId, clientSecret } = config
            const RingCentralSdk = (window as any).RingCentral.SDK;
            return new RingCentralSdk({
                server: RingCentralSdk.server.production,
                clientId,
                clientSecret,
            });
        }
        
        const login = async (rcsdk) => {
            const { userName: username, password } = config
            await rcsdk
                .login({
                    username,
                    extension: '',
                    password
                })
                .then((response) => {
                    return response.json()
                })
                .catch((e) => {
                    const msg = `Login fails: ${e.message}.`
                    alert(msg)
                });
        }

        const initSDK = async () => {
            const rcsdk = initRingCentralSdk();
            await login(rcsdk);
        }
        
        initSDK()
    }, [])
}
