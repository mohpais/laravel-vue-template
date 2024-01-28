import Rest from "@/global/rest"; // Import from Global Packages
const rest = new Rest().Api(); // Creating a Rest instance

export const GetUserList = async () => {
    try {
        return await rest.get(`user/list`);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const GetUser = async (id) => {
    try {
        return await rest.get(`user/edit/` + id);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const CreateUser = async (payload) => {
    try {
        return await rest.post(`user/create`, payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
