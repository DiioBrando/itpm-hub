export interface ProjectItemProps {
    project: {
        _id: string;
        nameProject: string;
    };
    liStyle?: string;
    onSelect: (projectId: string) => void;
    isSelected: boolean;
}