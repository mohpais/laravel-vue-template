import Rest from "@/global/rest"; // Import from Global Packages
const rest = new Rest().Api(); // Creating a Rest instance

export const GetRoleList = async (payload) => {
    try {
        return await rest.get(`role/list`, payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
