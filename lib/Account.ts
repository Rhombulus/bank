
import * as web from 'web-request';

var base = 'https://bank.simple.com';
export interface Card{ }

export interface Balances {
    total: number;
    safe_to_spend:number;
}

export interface Accounts {}

interface LinkedAccounts {
accounts: Accounts;
}

export interface Transactions {}

export class Account {

    static async login(username: string, password: string) {
        return new Account().login(username, password);
    }
    private async getCSRF(): Promise<string> {
        const result = await web.get(base, {jar:true});
        const [, token] = /<meta name="_csrf" content="(.*)">/.exec(result.content);
        return token;
    }

    async login(username: string, password: string) {

        const form = {
            username,
            password,
            _csrf: await this.getCSRF(),
        };

        const response = await web.post(`${base}/signin`, {jar: true}, form);

        if (response.statusCode !== 303)
            throw new Error(`Login failed: ${response.statusCode} ${response.statusMessage}`);
        return this;
    }

    async logout() {
        await web.get(`${base}/signout`, { jar: true });
    }

    async card() {
        return web.json<Card>(`${base}/card`, { jar: true });
    }

    async balance() {
        const result = await web.json<Balances>(`${base}/account/balances`, { jar: true });
        result.total /= 10000;
        result.safe_to_spend /= 10000;
        return result;
    }

    async external() {
        const result = await web.json<LinkedAccounts>(`${base}/linked-accounts`, { jar: true });
        return result.accounts;
    }

    async transactions() {
        return web.json<Transactions>(`${base}/transactions/data`, { jar: true });
    }
}


