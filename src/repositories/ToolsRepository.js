import API from '@/repositories/API';

export default function ToolsRepository() {
    const getTools = async () => {
        return API.get('/tools', {background: true})
    }

    return {
        getTools
    }
}