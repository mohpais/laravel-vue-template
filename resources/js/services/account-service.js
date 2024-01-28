import Rest from "@/global/rest"; // Import from Global Packages
const rest = new Rest().Api(); // Creating a Rest instance

export const DoLogin = async (payload) => {
    try {
        return await rest.post(`auth/login`, payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const DoRegist = async (payload) => {
    try {
        return await rest.post(`auth/register`, payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
