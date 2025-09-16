export declare enum BaseEntityTableColumnNames {
    id = "id",
    createdAt = "created_at",
    updatedAt = "updated_at"
}
export declare abstract class BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
