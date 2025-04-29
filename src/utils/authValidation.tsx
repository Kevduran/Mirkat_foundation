import Cookies from 'js-cookie';

export async function validateToken(): Promise<boolean> {

    const token = Cookies.get('authToken');

    if (!token) {
        return false;
    }

    const res = await fetch("http://localhost:3000/auth/validate", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`,
            },
        });
    
    const data: any = await res.json();
    return data.check;
            
}