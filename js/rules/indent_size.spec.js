var _ = require('lodash');
var common = require('../test-common');
var IndentSizeRule = require('./indent_size');
var expect = common.expect;
var reporter = common.reporter;
var context = common.context;
var rule = new IndentSizeRule();
var createLine = common.createLine;
// ReSharper disable WrongExpressionStatement
describe('indent_size rule', function () {
    beforeEach(function () {
        reporter.reset();
    });
    describe('check command', function () {
        it('reports invalid indent size', function () {
            rule.check(context, { indent_size: 4 }, createLine('  foo'));
            expect(reporter).to.have.been.calledOnce;
            expect(reporter).to.have.been.calledWithExactly('Invalid indent size detected: 2');
        });
        it('remains silent when indent size is indeterminate', function () {
            rule.check(context, { indent_size: 4 }, createLine('foo'));
            expect(reporter).to.not.have.been.called;
        });
        it('remains silent when indent size is valid', function () {
            rule.check(context, { indent_size: 1 }, createLine(' foo'));
            rule.check(context, { indent_size: 1 }, createLine('  foo'));
            rule.check(context, { indent_size: 1 }, createLine('   foo'));
            rule.check(context, { indent_size: 1 }, createLine('    foo'));
            rule.check(context, { indent_size: 1 }, createLine('     foo'));
            rule.check(context, { indent_size: 1 }, createLine('      foo'));
            rule.check(context, { indent_size: 1 }, createLine('       foo'));
            rule.check(context, { indent_size: 1 }, createLine('        foo'));
            rule.check(context, { indent_size: 2 }, createLine('  foo'));
            rule.check(context, { indent_size: 2 }, createLine('    foo'));
            rule.check(context, { indent_size: 2 }, createLine('      foo'));
            rule.check(context, { indent_size: 2 }, createLine('        foo'));
            rule.check(context, { indent_size: 3 }, createLine('   foo'));
            rule.check(context, { indent_size: 3 }, createLine('      foo'));
            rule.check(context, { indent_size: 4 }, createLine('    foo'));
            rule.check(context, { indent_size: 4 }, createLine('        foo'));
            rule.check(context, { indent_size: 5 }, createLine('     foo'));
            rule.check(context, { indent_size: 6 }, createLine('      foo'));
            rule.check(context, { indent_size: 7 }, createLine('       foo'));
            rule.check(context, { indent_size: 8 }, createLine('        foo'));
            expect(reporter).to.not.have.been.called;
        });
    });
    describe('infer command', function () {
        it('infers tab setting', function () {
            expect(rule.infer(createLine('\tfoo'))).to.equal('tab');
            expect(rule.infer(createLine('\t\tfoo'))).to.equal('tab');
            expect(rule.infer(createLine('\t\t foo'))).to.equal('tab');
        });
        _.range(0, 9).forEach(function (n) {
            it('infers ' + n + '-space setting', function () {
                expect(rule.infer(createLine(_.repeat(' ', n) + 'foo'))).to.eq(n);
            });
        });
        it('infers only leading spaces when tabs follow', function () {
            expect(rule.infer(createLine('  \tfoo'))).to.eq(2);
        });
    });
    describe('fix command', function () {
        it('replaces leading spaces with tabs', function () {
            var line = rule.fix({
                indent_style: 'tab',
                indent_size: 'tab',
                tab_width: 4
            }, createLine('          foo'));
            expect(line.text).to.equal('\t\t  foo');
            line = rule.fix({
                indent_style: 'tab',
                indent_size: 4
            }, createLine('          foo'));
            expect(line.text).to.equal('\t\t  foo');
        });
        it('replaces leading tabs with spaces', function () {
            var line = rule.fix({
                indent_style: 'space',
                indent_size: 4
            }, createLine('\t\t  foo'));
            expect(line.text).to.equal('          foo');
        });
        it('does nothing when no indent style is defined', function () {
            var line = rule.fix({}, createLine('\t foo'));
            expect(line.text).to.eq('\t foo');
        });
    });
});
