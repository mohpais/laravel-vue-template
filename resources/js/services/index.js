import Rest from "@/global/rest"; // Import from Global Packages
const rest = new Rest().Api(); // Creating a Rest instance

export * from './account-service';
export * from './user-service';
export * from './role-service';

export const GetListDataTables = async (_url, payload) => {
    try {
        return await rest.post(_url, payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
export const DeleteItemOnDataTables = async (_url, _payload) => {
    try {
        return await rest.post(_url, _payload);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};