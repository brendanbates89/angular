/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {INJECTOR_KEY} from '@angular/upgrade/src/aot/constants';
import {downgradeInjectable} from '@angular/upgrade/src/aot/downgrade_injectable';

export function main() {
  describe('downgradeInjectable', () => {
    it('should return an Angular 1 annotated factory for the token', () => {
      const factory = downgradeInjectable('someToken');
      expect(factory[0]).toEqual(INJECTOR_KEY);
      expect(factory[1]).toEqual(jasmine.any(Function));
      const injector = {get: jasmine.createSpy('get').and.returnValue('service value')};
      const value = (factory as any)[1](injector);
      expect(injector.get).toHaveBeenCalledWith('someToken');
      expect(value).toEqual('service value');
    });
  });
}
