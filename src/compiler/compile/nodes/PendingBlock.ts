import map_children from './shared/map_children.ts';
import AbstractBlock from './shared/AbstractBlock.ts';

export default class PendingBlock extends AbstractBlock {
	type: 'PendingBlock';
	constructor(component, parent, scope, info) {
		super(component, parent, scope, info);
		this.children = map_children(component, parent, scope, info.children);

		if (!info.skip) {
			this.warn_if_empty_block();
		}
	}
}
