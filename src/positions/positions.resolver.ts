import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PositionsService } from "./positions.service";
import { Position } from "./positions.model";
import { CreatePositionInput } from "./inputs/create-position.input";
import { UpdatePositionInput } from "./inputs/update-position.input";

@Resolver(() => Position)
export class PositionsResolver {
    constructor(private readonly positionsService: PositionsService) {}

    @Mutation(() => Position)
    createDepartment(@Args('createPositionInput') createPositionInput: CreatePositionInput) {
        return this.positionsService.createPosition(createPositionInput);
    }

    @Query(() => [Position], {name: 'positions'})
    findAll() {
        return this.positionsService.getAllPositions();
    }

    @Query(() => Position, {name: 'position'})
    findOne(@Args('id') id: number) {
        return this.positionsService.getPositionById(id);
    }

    @Mutation(() => Position)
    updateDepartment(@Args('updatePositionInput') updatePositionInput: UpdatePositionInput) {
        return this.positionsService.updatePositionWithInput(updatePositionInput.id, updatePositionInput)
    }

    @Mutation(() => Position)
    removeDepartment(@Args('id') id: number) {
        return this.positionsService.removePosition(id);
    }
}