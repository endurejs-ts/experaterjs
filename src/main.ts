import express from 'express';

export function Listen({ port, methodname }: { port: number, methodname: string }) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);

                const app = express();
                const method = (this as any)[methodname];

                if (typeof method === "function") {
                    method.call(this, app);
                    
                    app.listen(port, () => {
                        console.log(`listening on port ${port}`);
                    });
                } else {
                    return;
                }
            }
        }
    }
}