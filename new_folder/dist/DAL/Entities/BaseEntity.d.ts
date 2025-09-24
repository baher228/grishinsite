import { OptionalProps } from '@mikro-orm/core';
export declare enum BaseEntityTableColumnNames {
    id = "id",
    createdAt = "created_at",
    updatedAt = "updated_at"
}
export declare abstract class BaseEntity<TOpt extends string = never> {
    [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | TOpt;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
