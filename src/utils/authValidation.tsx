import Cookies from 'js-cookie';

export async function validateToken(): Promise<boolean> {

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const token = Cookies.get('authToken');

    if (!token) {
        return false;
    }

    const res = await fetch(`${baseURL}auth/validate`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`,
            },
        });
    
    const data: any = await res.json();
    return data.check;
            
}